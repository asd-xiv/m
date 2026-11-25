# @asd14/m SPEC pending

## Deferred

- `pipe.from<T>()`, a typed entry for a pipe whose first step is generic, eg.
  `pipe.from<Todo>()(read("path"), trim({ chars: "/" }))`. Today the caller
  types the first step: `pipe((todo: Todo) => todo.path, trim({ chars: "/" }))`
- Type each step of a pipe array in a patcher or a matcher, as `filter` and
  `map` type theirs. Today `MorphismPipe` types the first input and the last
  output, and its middle steps are `any`, so
  `evolve({ id: [String, (n: number) => n + 1] }, todo)` type-checks. A feature
  to design on its own, not a fix

## Open questions

- Map and Set as inputs: which functions take them, and what they return, eg.
  `filter` over a `Set`, or `keys(map)`. In 9.0 an object is a plain object, so
  `keys(new Map())` throws. `isDeepEqual` already compares both
