---
version: 0.1.0
status: draft
stage: alpha
---

# @asd14/m project specification

## Principles

### Data flows top-down, effortlessly, through the pipes

Each step of a pipe takes what the step above returns. A lambda whose only job
is to route data to a step is effort: the data still flows, but with a nudge.

```ts
// Effortless: each step takes the output of the step above
pipe(
  read("tags"),
  flatten
)({
 tags: [[1], [2, [3]]]
})
// => [1, 2, 3]

// Effort: a lambda routes `tags` into the options form
pipe(
  read("tags"),
  tags => flatten({ level: 1 }, tags)
)({
  tags: [[1], [2, [3]]]
})
// => [1, 2, [3]]
```

The rules below make the principle testable.

## Rules

### Every function is a pipe step

Leave out the last argument, and a call returns a function of one argument: a
pipe step.

```ts
// Bad: mergeBy(strategy) returns (a, b) => …, which a pipe cannot call
pipe(mergeBy(definedWins))(incoming)

// Good: the last argument is the data
pipe(mergeBy(definedWins, defaults))(incoming)
// => defaults, with each defined key of incoming on top
```

### One argument is the input

A call with one argument takes it as the input. It takes it as options only when
its type can never be the input.

```ts
// Bad: a string can be the text, so `trim("/")` must guess
trim("/")

// Good: an object can never be the text
trim({ chars: "/" })("/usr/local/")
// => "usr/local"
map(trim, ["  a  ", " b"])
// => ["a", "b"]
```

### The input is never mutated

Every function returns a new value. An array parameter is `readonly T[]`, a
returned array is `T[]`.

```ts
// Bad: Array.prototype.sort sorts in place, and the caller's array changes
const sortAsc = (input: number[]) => input.sort((a, b) => a - b)

// Good
const ids = [3, 1, 2] as const
sort("asc", ids)
// => [1, 2, 3], and `ids` stays [3, 1, 2]
```

### An array in a function slot is a pipe

A function slot is a parameter that takes a function. It also takes an array of
functions, and pipes them. So a plain value is never an array.

```ts
// Bad: an inline pipe() types `read("id")` before it sees `todos`, and fails
filter(pipe(read("id"), isEqual(1)), todos)

// Good: TypeScript types each step of the array from `todos`
filter([read("id"), isEqual(1)], todos)

// Bad: the array reads as a pipe
update({ tags: [] }, todo)
// throws "@asd14/m/update: expected 'patcher.tags' to be 'NonEmpty', got 'Empty'"

// Good: a function returns the array
update({ tags: () => [] }, todo)
```

### One rule per concept

Each concept follows the same rule in every function:

| Concept              | Rule                                                        |
| -------------------- | ----------------------------------------------------------- |
| A predicate passes   | when it returns `=== true`                                  |
| Two values are equal | SameValueZero, as `Array.prototype.includes`                |
| A key                | an own key, read with `Object.hasOwn`                       |
| An object            | a plain object: its prototype is `Object.prototype` or null |

```ts
// Bad: remove compares with `===`, while distinct uses SameValueZero
remove(NaN, [NaN, 1])
// => [NaN, 1]

// Good
remove(NaN, [NaN, 1])
// => [1]
```

### A callback gets only the item

A function passes its callback the item and nothing else, unless the position of
the item is the function's job.

```ts
// Bad: map passes (item, index, array), and parseInt reads the index as its radix
map(parseInt, ["6", "8", "10"])
// => [6, NaN, 2]

// Good
map(parseInt, ["6", "8", "10"])
// => [6, 8, 10]

// Good: the index is the job of mapIndexed
mapIndexed((item, index) => `${index}:${item}`, ["a", "b"])
// => ["0:a", "1:b"]
```

> [!IMPORTANT]\
> **Needs clarification**: A patch function of `update` and `evolve` gets
> `(currentValue, source)`, and `source` is not its job. Dropping it makes
> `update({ total: sum })` work, but computing a key from other keys then needs
> a lambda: `map(user => update({ fullName: … }, user))`. Keep `source`, or drop
> it?

### A feature that cannot be typed cleanly stays out

When TypeScript cannot type a feature without a quirk, eg. a union input or a
`@ts-expect-error` in the caller's code, m does not support it.

```ts
// Bad: `all` wraps a non-array input, so its input type is `T | T[]`
all(isNumber, 5)
// => true

// Good: the input is an array, and anything else throws
all(isNumber, 5)
// throws "@asd14/m/all: expected 'input' to be 'Array', got 'Number'"
```

### A name should keep the meaning other libraries gave it

When another library already names a concept, m should use its name and its
meaning. This rule guides a choice, and another rule can outweigh it.

```ts
// Bad: lodash's isObject is true for an array, so the same name for a
// prototype check misleads a lodash user
isObject([])

// Good: lodash, es-toolkit and Remeda call the prototype check isPlainObject
isPlainObject([])
// => false
```

### An error names the function and the path

A `TypeError` names the public function, and the path to the bad part, eg. an
item of a pipe array or a key of a patcher.

```ts
// Bad: the engine's error, from inside the pipe
filter([read("id"), "x"], todos)
// throws "fns[1] is not a function"

// Good
filter([read("id"), "x"], todos)
// throws "@asd14/m/filter: expected 'fn[1]' to be 'Function', got 'String'"
```
