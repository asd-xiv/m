# Type tests (TSTyche)

Type tests are the type-level contract of every function. Users read `*.tst.ts`
files to understand what types flow in and out — what the function infers, what
it rejects, and how generics behave across calling conventions.

Write every type test as if it answers the question: "What will TypeScript infer
when I use this?". The reader should walk away knowing:

- **What types are inferred** — exact return types for each calling style
- **How generics propagate** — through predicate pipes, curried chains, and
  complex data shapes
- **Where to add type annotations** — when curried inference needs a nudge, show
  exactly which function in the chain to annotate
- **What TypeScript rejects** — wrong input types produce specific,
  understandable errors

## Full example

```ts
// partition.tst.ts
import { describe, expect, test } from "tstyche"

import { partition } from "./partition.js"

const isEven = (input: number): boolean => input % 2 === 0

describe("partition", () => {
  test("partition - uncurried", () => {
    expect(partition(isEven, [1, 2, 3])).type.toBe<[number[], number[]]>()

    expect(partition(isEven, [])).type.toBe<[number[], number[]]>()

    expect(
      partition([item => item.id, id => id > 0], [{ id: 1 }, { id: 2 }])
    ).type.toBe<[{ id: number }[], { id: number }[]]>()
  })

  test("partition - curried", () => {
    expect(partition(isEven)([1, 2, 3])).type.toBe<[number[], number[]]>()

    {
      // you only need to type the 1st function in the pipe chain, the rest
      // will get inferred
      const pickId = (item: { id: number }) => item.id
      const items = [{ id: 1 }, { id: 2 }]
      const partitionedItems = partition([pickId, id => id > 0])(items)

      expect(partitionedItems).type.toBe<[{ id: number }[], { id: number }[]]>()
    }
  })

  test("partition - invalid input", () => {
    // @ts-expect-error Type 'string' is not assignable to type 'number'.
    partition(isEven, [1, "2", 3])

    // @ts-expect-error Type 'string' is not assignable to type 'number'.
    partition(isEven)([1, "2", 3])
  })
})
```

## Conventions

### Grouping

Groups are `test("fn - group")` nested under a single `describe("fn")`:

| Group                | When to include                                                                     |
| -------------------- | ----------------------------------------------------------------------------------- |
| `fn - uncurried`     | Always — show the basic inferred types first                                        |
| `fn - curried`       | When function supports curried form — show how inference flows across the two calls |
| `fn - invalid input` | Always — show what TypeScript catches at compile time                               |
| `fn - aliases`       | When the function has aliases (`zipToObj`, `size`, etc.)                            |

Start with uncurried (simplest inference), then curried (where generic
propagation gets interesting), then invalid (the type-level safety net).

### `{}` blocks for scoped test data

Same rules as runtime tests — use `{}` blocks when assertions need typed
variables or complex setup. In type tests, this is especially useful to show the
user where to place type annotations for curried inference:

```ts
test("partition - curried", () => {
  // simple — inference just works, user needs zero annotations
  expect(partition(isEven)([1, 2, 3])).type.toBe<[number[], number[]]>()

  // complex — show the user exactly where to annotate
  {
    // you only need to type the 1st function in the pipe chain, the rest
    // will get inferred
    const pickId = (item: { id: number }) => item.id
    const items = [{ id: 1 }, { id: 2 }]
    const partitionedItems = partition([pickId, id => id > 0])(items)

    expect(partitionedItems).type.toBe<[{ id: number }[], { id: number }[]]>()
  }
})
```

The comment `// you only need to type the 1st function...` is intentional — it
teaches the user the minimal annotation strategy instead of letting them guess
or over-annotate.

### `@ts-expect-error` must include the error message

Put `// @ts-expect-error` on the line above the call that fails, followed by the
expected TypeScript error. TSTyche matches the whole message, and `...` in the
middle skips a part. This ensures the test breaks if the error changes, and it
tells the user exactly what error to expect when they misuse the API:

```ts
// Good — user sees the exact error they'll get
// @ts-expect-error Type 'string' is not assignable to type 'number'.
partition(isEven, [1, "2"])

// Good — `...` skips the part of a long message the user does not need
// @ts-expect-error Argument of type ... is not assignable to parameter of type 'number'.
inc("1")

// Bad — passes for any error, user learns nothing about what went wrong
// @ts-expect-error
partition(isEven, [1, "2"])
```

`toRaiseError()` is deprecated in TSTyche 7, use the directive instead.

### Tests mirror realistic usage

Type tests should look like code the user would actually write. If the type test
uses realistic variable names and data shapes, the user can mentally map it to
their own codebase:

```ts
// Good — "I have objects with IDs, I want to partition by ID > 0"
const pickId = (item: { id: number }) => item.id
partition([pickId, id => id > 0])(items)

// Avoid — user has to decode type annotations before understanding the pattern
partition([(item: { id: number }) => item.id, (id: number) => id > 0])(items)
```

Type tests that read like recipes get copied. Type tests that read like type
puzzles get skipped.
