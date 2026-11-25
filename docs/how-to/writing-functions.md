# Writing functions

Every function in `@asd14/m` follows the same structure: a thin public shell
that handles currying and validates input, delegating to an internal convergence
`_helper` point that does the actual work.

- **Imperative inside, functional composition on the outside**: Users compose
  clean pipelines; internally, each primitive is a tight loop with no closures,
  no recursion, no abstraction overhead.
- **Input is never mutated**: Every function returns new arrays, new objects,
  new tuples. This is a core guarantee of the library. The types say it too: an
  array parameter is `readonly T[]`, a returned array is `T[]`.

## Full example

```ts
// partition.ts
import type { AnyMorphism, UnaryPredicate } from "../../types/function.js"

import { type } from "../type/type.js"
import { _toFunction } from "../utils/to-function.js"

// --- Types ---

type PartitionFn = {
  <T>(fn: UnaryPredicate<T>, input: readonly T[]): [T[], T[]]
  <T>(fn: UnaryPredicate<T>): (input: readonly T[]) => [T[], T[]]
}

// --- Internal helper ---

const _partition = (
  fn: AnyMorphism,
  input: unknown
): [unknown[], unknown[]] => {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/partition: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }

  const pass: unknown[] = []
  const fail: unknown[] = []

  for (let i = 0, length = input.length; i < length; i++) {
    if (fn(input[i]) === true) {
      pass.push(input[i])
    } else {
      fail.push(input[i])
    }
  }

  return [pass, fail]
}

// --- Public function ---

const partition = ((...params: unknown[]) => {
  const fn = _toFunction(params[0], { fnName: "partition", paramName: "fn" })

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: unknown) => _partition(fn, input)
  }

  // @signature (fn, input)
  return _partition(fn, params[1])
}) as PartitionFn

export { partition }
export type { PartitionFn }
```

## Anatomy

### 1. Internal helper (`_fn`)

The `_helper` is where the work happens. It receives all arguments in known
positions — no currying ambiguity, no `params.length` branching.

```ts
const _partition = (fn: AnyMorphism, input: unknown): [unknown[], unknown[]] => {
  // validate variable-position params here (see "Input validation" below)
  // ...
  // imperative loop — no library primitives
  for (let i = 0, length = input.length; i < length; i++) { ... }
}
```

**Use manual `for` loops**, not `Array.prototype.map/filter/reduce` and
definitely not other `@asd14/m` primitives like `map()` or `filter()`. Each
function is a leaf in the dependency graph — it should not pull in siblings.

Three exceptions:

- **`src/utils/`** — the private helpers every function shares: `_toFunction`
  turns a function slot into one function, a pipe array included (see
  [pipe arrays](./pipe-arrays.md)). `_buildMatch` and `_buildPatch` check a
  matcher or a patcher once. `_setOwn` writes an own key
- **`isEqual`** — every value comparison uses SameValueZero, so `NaN` equals
  `NaN` everywhere. A copied comparison drifts
- **The base function of a variant** — `filterWith` delegates to `filter`, see
  "The `*With` variant pattern" below

These are foundational enough that reusing them is a net win. Everything else:
write the loop.

### 2. Public function (currying shell)

The public function is a manual `params.length` switch that routes to `_helper`.
No `curry()` wrapper — manual branching is explicit, creates fewer closures, and
handles ambiguous first arguments (see
[decision 01](../decisions/01.use-manual-currying.md)).

```ts
const partition = ((...params: unknown[]) => {
  // validate fixed-position params here, once, at the first call
  const fn = _toFunction(params[0], { fnName: "partition", paramName: "fn" })

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: unknown) => _partition(fn, input)
  }

  // @signature (fn, input)
  return _partition(fn, params[1])
}) as PartitionFn
```

Mark each branch with a `// @signature` comment. These comments are the currying
contract — a reader scanning the file should immediately see all calling
conventions without parsing the logic.

### 3. Exports

Always at the end of the file:

```ts
export { partition }
export type { PartitionFn }
```

Types on a separate `export type` statement.

## Input validation

TS types vanish at runtime. API responses, JSON parsing, event payloads, all
bypass the type system. When a function receives wrong input mid-pipe, the error
surfaces as `cannot read property of undefined` three steps later.

Every public function throws `TypeError` with the function name and quoted
parameter name. The name may be a path to the bad part: `'fn[1]'` is an item of
a pipe array, `'patcher.tags'` a key, `'input[*]'` any item of the input:

```ts
@asd14/m/partition: expected 'fn' to be 'Function' or 'Array', got '${type(fn)}'
@asd14/m/sort: expected 'input' to be 'Array', got '${type(input)}'
@asd14/m/filterWith: expected 'input[*]' to be 'Object', got '${type(item)}'
```

Where the check lives depends on where the parameter lands:

- **Fixed-position params**: always `params[0]`, validate in the public function
  body:

```ts
const sort = ((...params: unknown[]) => {
  const direction = params[0]

  // direction is always params[0], regardless of curried or uncurried
  if (direction !== "asc" && direction !== "desc") {
    throw new TypeError(
      `@asd14/m/sort: expected 'direction' to be 'asc' or 'desc', got '${direction}'`
    )
  }
  // ...
```

- **Variable-position params** (`input`): position shifts between curried
  (`params[0]` of the returned function) and uncurried (`params[1]`). Validate
  in the `_helper`, the convergence point where positions are known:

```ts
const _partition = (fn: AnyMorphism, input: unknown): [unknown[], unknown[]] => {
  // input arrives here from both signatures
  if (!Array.isArray(input)) {
    throw new TypeError(
      `@asd14/m/partition: expected 'input' to be 'Array', got '${type(input)}'`
    )
  }
  // ...
```

The check itself is cheap - a single `typeof`, `Array.isArray`, or type-guard.
Negligible cost compared to the operation.

A parameter that accepts any value needs no check — there is nothing to reject.
For example the `input` of `i`, `type` and `toString`, or the `value` of
`defaultTo`.

## The `*With` variant pattern

Functions that accept a predicate (`filter`, `find`, `partition`) often have a
`*With` variant that accepts a matcher object instead. These are thin wrappers:

```ts
// filter-with.ts
const _filterWith = (
  predicate: (input: unknown) => boolean,
  input: unknown
): unknown[] => {
  // check input here, so the error names filterWith, not filter
  // ...
  return filter(predicate, input)
}

const filterWith = ((...params: unknown[]) => {
  const predicate = _buildMatch(params[0], {
    fnName: "filterWith",
    inputName: "input[*]",
  })
  // ...
```

The `*With` variant turns the matcher into a predicate once, via `_buildMatch`,
and delegates to the base function. No duplicated loop logic.

## File structure (HMVC + collocation)

Each function lives in its own directory with tests collocated:

```
src/
  partition/
    partition.ts          # implementation
    partition.test.ts     # runtime tests (Tape)
    partition.tst.ts      # type tests (TSTyche)
    with/
      partition-with.ts
      partition-with.test.ts
      partition-with.tst.ts
  utils/
    to-function.ts        # a private helper, never exported from index.ts
    to-function.test.ts
```

Variants (`*With`, `*By`) go in subdirectories. Everything about `partition`
lives under `src/partition/`. A helper that a second function needs moves up to
`src/utils/`, with a `_` prefix.
