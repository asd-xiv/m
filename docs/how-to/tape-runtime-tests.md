# Runtime tests (Tape)

Tests are the primary way users learn how a function works. Before reading JSDoc
or source code, they look at `*.test.ts` files to understand calling
conventions, edge cases, and how primitives compose together.

Write every test as if it's a usage example in a tutorial. The reader should
walk away knowing:

- **How to call it** — uncurried, curried, with predicate pipes
- **What it returns** — concrete input/output pairs, not abstract descriptions
- **How it composes** — realistic setups with named functions, not synthetic
  inline lambdas
- **What happens when things go wrong** — clear error messages that guide the
  user to the fix

## Full example

```ts
// partition.test.ts
import test from "tape"

import { partition } from "./partition.js"
import { isSomething } from "../is/is.js"

const isEven = (input: number): boolean => input % 2 === 0

test("partition - uncurried", t => {
  t.deepEqual(
    partition(isEven, [1, 2, 3, 4, 5]),
    [
      [2, 4],
      [1, 3, 5]
    ],
    "given [isEven predicate and numbers] should [split into even and odd]"
  )

  t.deepEqual(
    partition(isEven, []),
    [[], []],
    "given [an empty array] should [return two empty arrays]"
  )

  {
    const items: { id: number; comments?: unknown[] }[] = [
      { id: 1, comments: [] },
      { id: 2 }
    ]

    t.deepEqual(
      partition([item => item.comments, isSomething], items),
      [[{ id: 1, comments: [] }], [{ id: 2 }]],
      "given [a predicate pipe] should [partition using the composed predicate]"
    )
  }

  t.end()
})

test("partition - curried", t => {
  t.deepEqual(
    partition(isEven)([1, 2, 3, 4, 5]),
    [
      [2, 4],
      [1, 3, 5]
    ],
    "given [isEven predicate curried] should [split into even and odd]"
  )

  t.end()
})

test("partition - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      partition(42, [1, 2])
    },
    /expected 'fn' to be 'Function' or 'Array', got 'Number'/,
    "given [a number as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      partition(isEven, "not-an-array")
    },
    /expected 'input' to be 'Array'/,
    "given [non-array input] should [throw TypeError]"
  )

  t.end()
})
```

## Conventions

### Grouping

Each group is a top-level `test("fn - group")`:

| Group                | When to include                                                         |
| -------------------- | ----------------------------------------------------------------------- |
| `fn - uncurried`     | Always — this is the first thing a user reads, show the simplest call   |
| `fn - curried`       | When function supports curried form — show how it fits in `pipe` chains |
| `fn - invalid input` | Always — covers both `fn` and `input` validation                        |
| `fn - aliases`       | When the function has aliases (`zipToObj`, `size`, etc.)                |

Order matters: uncurried first (simplest mental model), curried second
(composition pattern), invalid last (error contract).

### Description format

Always `"given [X] should [Y]"`. The brackets are literal — they visually
separate setup from expectation in test output.

Descriptions should read like a sentence a user would say: "given an empty
array, should return two empty arrays". Not implementation-speak like "handles
empty input correctly".

### `{}` blocks for scoped test data

When a test assertion needs typed variables or complex setup, wrap it in a `{}`
block. This avoids polluting the outer `test()` scope and lets you reuse
variable names like `items` across blocks:

```ts
test("partition - uncurried", t => {
  // simple assertions go directly — the reader sees the basic usage first
  t.deepEqual(partition(isEven, [1, 2, 3]), [[2], [1, 3]], "...")

  // complex setup gets its own block — like a second example in a tutorial
  {
    const items: { id: number; comments?: unknown[] }[] = [
      { id: 1, comments: [] },
      { id: 2 }
    ]

    t.deepEqual(
      partition([item => item.comments, isSomething], items),
      [[{ id: 1, comments: [] }], [{ id: 2 }]],
      "given [a predicate pipe] should [partition using the composed predicate]"
    )
  }

  t.end()
})
```

Use `{}` blocks when:

- The input needs an explicit type annotation (avoids inline `as` casts)
- Multiple variables are needed for a single assertion
- The same variable name is reused across tests in the same group

Do NOT use `{}` blocks for simple one-liner assertions.

### `@ts-expect-error` only for invalid input

Use `@ts-expect-error` exclusively in the "invalid input" group, where the test
intentionally passes wrong types to verify runtime validation. Never use it to
work around type inference issues — if a test needs a cast, the API needs
fixing.

### Runtime error messages reference parameter names

Error messages use quoted parameter names so it's clear which argument is wrong.
A user seeing this error in their console should immediately know which argument
to fix:

```text
// Good — immediately clear which param failed
@asd14/m/partition: expected 'fn' to be 'Function' or 'Array', got 'Number'
@asd14/m/partition: expected 'input' to be 'Array', got 'String'

// Bad — ambiguous, especially when multiple params could be "input"
@asd14/m/partition: expected 'Function' or 'Array', got 'Number'
```

Test regexes match these quoted names:

```ts
t.throws(
  () => partition(42, [1, 2]),
  /expected 'fn' to be 'Function' or 'Array', got 'Number'/,
  "given [a number as fn] should [throw TypeError]"
)
```

### Tests mirror realistic usage

Tests are how users learn to compose your function. Write them the way you want
users to write their code — with named functions, readable pipelines, and
realistic data shapes:

```ts
// Good — reads like real code, user can copy-paste this pattern
const pickId = (item: { id: number }) => item.id
partition([pickId, id => id > 0])(items)

// Avoid — hard to scan, type annotations clutter the assertion
partition([(item: { id: number }) => item.id, (id: number) => id > 0])(items)
```

If a test reads like a chore, the user will treat the function like a chore. If
a test reads like a clean example, the user will reach for it naturally.
