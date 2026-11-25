# Pipe arrays

An array in a function slot is a pipe. `filter([read("id"), isEqual(1)], items)`
runs as `filter(pipe(read("id"), isEqual(1)), items)`, with one difference:
TypeScript types each step of the array from `items`. See
[decision 05](../decisions/05.read-an-array-as-a-pipe.md).

The reader should walk away knowing:

- **Where it applies** — every function slot, and what that costs a value slot
- **How a function supports it** — one call in the shell, one error format

A pipe array is not a function: it works only where an m function takes it. To
name a chain and reuse it elsewhere, eg. in `Array.prototype.filter`, write
`pipe(...)`.

## Full example

```ts
const todos = [
  { id: 1, tags: ["a"] },
  { id: 2, tags: [] },
]

filter([read("id"), isEqual(1)], todos)
// => [{ id: 1, tags: ["a"] }]

filterWith({ tags: [tags => tags.length, isEqual(0)] }, todos)
// => [{ id: 2, tags: [] }]

evolve({ tags: [tags => tags.length, count => `${count} tags`] }, todos[0])
// => { id: 1, tags: "1 tags" }

filter([read("id"), "x"], todos)
// throws "@asd14/m/filter: expected 'fn[1]' to be 'Function', got 'String'"
```

## Conventions

### Every function slot takes a pipe array

The shell turns the slot into a function once, at the first call, with
`_toFunction`. The `_helper` gets a function and never sees the array:

```ts
const filter = ((...params: unknown[]) => {
  const fn = _toFunction(params[0], { fnName: "filter", paramName: "fn" })

  // @signature (fn) => (input)
  if (params.length === 1) {
    return (input: unknown) => _filter(fn, input)
  }

  // @signature (fn, input)
  return _filter(fn, params[1])
}) as FilterFn
```

`_toFunction` checks each function of the array, and names the caller and the
path to the bad item:

```text
@asd14/m/filter: expected 'fn[1]' to be 'Function', got 'String'
@asd14/m/evolve: expected 'patcher.tags[0]' to be 'Function', got 'Number'
@asd14/m/update: expected 'patcher.tags' to be 'NonEmpty', got 'Empty'
```

A slot that passes more than one value, eg. `reduce`'s `(acc, item)` or
`uniteBy`'s `(a, b)`, takes a function only. A pipe passes one value.

### A plain value is never an array

A patcher, a matcher and `any`'s value slot take a value or a function. An array
there is a pipe, so the types reject an array literal:

```ts
// Bad — a type error, and a TypeError at runtime
update({ tags: [] }, todo)

// Good — a function returns the array
update({ tags: () => [] }, todo)

// Bad — the array would run as a pipe
filterWith({ tags: ["a"] }, todos)

// Good — a predicate compares the array
filterWith({ tags: tags => isDeepEqual(tags, ["a"]) }, todos)
```

The types carry the rule once: `KeyMorphism` and `KeyMatcher` exclude
`readonly unknown[]` from their plain-value branch.

### A pipe passes one value

The first function of a pipe array gets only the item, even where the slot
passes more, eg. `mapIndexed`'s `(item, index, array)` or a patcher's
`(currentValue, source)`. To read the index, write a function, not an array.

### Show a pipe array in the type tests

Each function with a function slot shows one pipe array in its `.tst.ts`, typed
only in the first function. Each function with a value slot shows one
`// @ts-expect-error` above an array literal. See
[TSTyche type tests](./tstyche-type-tests.md).
