# Curried type inference limitation

## The problem

```ts
// Uncurried — T inferred as `number` from input array
partition(x => x > 0, [1, 2, 3])  // ✓ x is number

// Curried — T is unknown, x > 0 fails
partition(x => x > 0)([1, 2, 3])  // ✗ x is unknown
```

## Why it happens

TypeScript resolves generics **left to right, one call at a time**.

### Uncurried: one call, all evidence available

```ts
partition(x => x > 0, [1, 2, 3])
//        ^^^^^^^^^   ^^^^^^^^^
//        fn: T→bool  input: T[]
//
// TS sees both params in the same call.
// Infers T = number from [1, 2, 3], flows it back to fn.
// x becomes number.
```

### Curried: two calls, first call has no input

```ts
partition(x => x > 0)([1, 2, 3])
// ─────────────────  ─────────
//     call 1             call 2
//
// Call 1: TS must resolve T from fn alone.
//         Anonymous lambda has no type annotation → T = unknown.
//         Returns (input: unknown[]) => [unknown[], unknown[]]
//
// Call 2: input is [1, 2, 3] but T is already locked to unknown.
```

The key insight: **call 1 is fully resolved before call 2 is even evaluated**.
The input array arrives too late to influence `T`.

## Workarounds

All work by giving TS enough information in the first call:

```ts
// 1. Named predicate — T inferred from its signature
const isPositive = (x: number): boolean => x > 0
partition(isPositive)([1, 2, 3])  // ✓ T = number

// 2. Annotate the lambda parameter
partition((x: number) => x > 0)([1, 2, 3])  // ✓ T = number

// 3. Explicit generic
partition<number>(x => x > 0)([1, 2, 3])  // ✓ T = number

// 4. Just use uncurried — TS has all evidence in one call
partition(x => x > 0, [1, 2, 3])  // ✓ T = number
```

## Would an inline generic work?

Yes, this works:

```ts
const partition = <T>(fn: (x: T) => boolean) => (input: T[]) => {
  const pass: T[] = []
  const fail: T[] = []
  for (const item of input) (fn(item) ? pass : fail).push(item)
  return [pass, fail] as [T[], T[]]
}

partition(x => x > 0)([1, 2, 3])  // ✓ x is number!
```

Wait — this also fails. `x => x > 0` still doesn't tell TS what `T` is. The
lambda is identical to before: no annotation, no inference source.

The difference people **expect** is that a single generic function somehow
defers `T` resolution across both calls. It doesn't. `T` must be resolved at the
call site of `partition(...)`, period.

What **does** work with inline generics is when the return type captures the
generic and the second call constrains it:

```ts
const partition = <T>(fn: (x: T) => boolean) => (input: T[]): [T[], T[]] => ...

// This still fails:
partition(x => x > 0)([1, 2, 3])  // T = unknown

// Because TS resolves the generic at the first call:
const step1 = partition(x => x > 0)  // T = unknown, locked
const step2 = step1([1, 2, 3])       // too late
```

## The real difference: overloaded type vs inline generic

The library uses overloaded callable types (`PartitionFn`) instead of inline
generics. This is required because:

1. **Multiple signatures** — uncurried `(fn, input)` and curried `(fn)` can't be
   expressed as a single generic arrow function
2. **Pipe array support** — predicate pipes like `[extractId, isPositive]` need
   separate overloads per pipe length (1-5 steps)
3. **`as Type` assertion** — the only way to type an arrow function with
   overloaded signatures in TypeScript

```ts
type PartitionFn = {
  <T>(fn: (x: T) => boolean, input: T[]): [T[], T[]]     // uncurried
  <T>(fn: (x: T) => boolean): (input: T[]) => [T[], T[]]  // curried
  // + pipe overloads...
}

const partition = ((...params) => { ... }) as PartitionFn
```

An inline generic function can only express **one** of these signatures. The
overloaded type is the price we pay for supporting both calling styles — and the
curried inference limitation is a consequence of how TypeScript resolves
generics per-call-site, not of the library's design.

## Summary

| Calling style     | Anonymous lambda | Named / annotated fn |
| ----------------- | ---------------- | -------------------- |
| `fn(pred, input)` | ✓ infers T       | ✓ infers T           |
| `fn(pred)(input)` | ✗ T = unknown    | ✓ infers T           |

The rule: **curried calls with anonymous lambdas need a type annotation**. This
is a TypeScript fundamental, not something the library can fix.
