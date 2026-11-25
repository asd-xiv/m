import test from "tape"

import { upsertWith } from "./upsert-with.js"
import { isSomething } from "../../is/is.js"

test("upsertWith - uncurried", t => {
  t.deepEqual(
    upsertWith({ id: 2 }, { id: 2, name: "new" }, [{ id: 1, name: "a" }]),
    [
      { id: 1, name: "a" },
      { id: 2, name: "new" },
    ],
    "given [no match] should [append the item]"
  )

  t.deepEqual(
    upsertWith({ id: 1 }, { id: 1, name: "new" }, [
      { id: 1, name: "old" },
      { id: 2, name: "old" },
    ]),
    [
      { id: 1, name: "new" },
      { id: 2, name: "old" },
    ],
    "given [a match] should [replace the matched item in place]"
  )

  t.deepEqual(
    upsertWith({ role: "admin" }, { role: "admin", seen: true }, [
      { role: "admin", seen: false },
      { role: "admin", seen: false },
    ]),
    [
      { role: "admin", seen: true },
      { role: "admin", seen: false },
    ],
    "given [several matches] should [replace only the first]"
  )

  {
    const items: { id: number; name?: string; age?: number }[] = [
      { id: 1, name: "a", age: 3 },
    ]

    t.deepEqual(
      upsertWith({ id: 1 }, { id: 1, name: "b" }, items),
      [{ id: 1, name: "b", age: 3 }],
      "given [an item missing a key of the found one] should [keep that key]"
    )
  }

  {
    const items: { id: number; name?: string }[] = [{ id: 1 }, { id: 2 }]

    t.deepEqual(
      upsertWith({ "!name": isSomething }, { id: 1, name: "new" }, items),
      [{ id: 1, name: "new" }, { id: 2 }],
      "given [a negated key] should [match the item that does not satisfy it]"
    )
  }

  {
    const items = [{ id: Number.NaN, name: "a" }]

    t.deepEqual(
      upsertWith({ id: Number.NaN }, { id: Number.NaN, name: "b" }, items),
      [{ id: Number.NaN, name: "b" }],
      "given [NaN as a match value] should [match NaN, compared with SameValueZero]"
    )
  }

  {
    const items: { id: number; tags: string[] }[] = [
      { id: 1, tags: ["a"] },
      { id: 2, tags: ["b"] },
    ]

    t.deepEqual(
      upsertWith({ tags: tags => tags[0] === "b" }, { id: 3, tags: [] }, items),
      [
        { id: 1, tags: ["a"] },
        { id: 3, tags: [] },
      ],
      "given [a predicate on an array field] should [match the array]"
    )
  }

  {
    const items: readonly { id: number }[] = [{ id: 1 }]
    const result = upsertWith({ id: 2 }, { id: 2 }, items)

    t.deepEqual(
      [items, result],
      [[{ id: 1 }], [{ id: 1 }, { id: 2 }]],
      "given [a readonly array] should [return a new array and not mutate the input]"
    )
  }

  {
    const items: { id: number; format: unknown }[] = [{ id: 1, format: null }]
    const format = (input: string): string => input.toUpperCase()

    t.deepEqual(
      upsertWith({ id: 1 }, { id: 1, format }, items),
      [{ id: 1, format }],
      "given [a function in the item] should [store it as a plain value]"
    )
  }

  t.end()
})

test("upsertWith - curried", t => {
  const items = [{ id: 1, name: "old" }]

  t.deepEqual(
    upsertWith({ id: 1 }, { id: 1, name: "updated" })(items),
    [{ id: 1, name: "updated" }],
    "given [match found] should [replace the matched item in place]"
  )

  t.deepEqual(
    upsertWith({ id: 2 }, { id: 2, name: "new" })(items),
    [
      { id: 1, name: "old" },
      { id: 2, name: "new" },
    ],
    "given [no match] should [append the item]"
  )

  t.end()
})

test("upsertWith - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => upsertWith(42, { id: 1 }, [{ id: 1 }]),
    /@asd14\/m\/upsertWith: expected 'match' to be 'Object', got 'Number'/,
    "given [a number as match] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => upsertWith(null, { id: 1 }, [{ id: 1 }]),
    /expected 'match' to be 'Object', got 'Null'/,
    "given [null as match] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => upsertWith([1, 2], { id: 1 }, [{ id: 1 }]),
    /expected 'match' to be 'Object', got 'Array'/,
    "given [an array as match] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => upsertWith({ id: 1 }, 42, [{ id: 1 }]),
    /@asd14\/m\/upsertWith: expected 'item' to be 'Object', got 'Number'/,
    "given [a number as item] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => upsertWith({ id: 1 }, () => ({ id: 1 }), [{ id: 1 }]),
    /expected 'item' to be 'Object', got 'Function'/,
    "given [a function as item] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => upsertWith({ id: 1 }, [1]),
    /expected 'item' to be 'Object', got 'Array'/,
    "given [an array as item, curried] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => upsertWith({ id: 1 }, { id: 1 }, "lorem"),
    /@asd14\/m\/upsertWith: expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => upsertWith({ id: 1 }, { id: 1 }, [null]),
    /@asd14\/m\/upsertWith: expected 'input\[\*\]' to be 'Object', got 'Null'/,
    "given [a null item in the input] should [name the item in the error]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => upsertWith({ tags: ["a"] }, { id: 1 }, []),
    /expected 'match.tags\[0\]' to be 'Function', got 'String'/,
    "given [an array in a match value] should [read it as a pipe and throw TypeError]"
  )

  t.deepEqual(
    // @ts-expect-error -- a predicate must return a boolean
    upsertWith({ id: (id: number) => id }, { id: 2 }, [{ id: 1 }]),
    [{ id: 1 }, { id: 2 }],
    "given [a predicate returning a truthy value] should [not match, only true does]"
  )

  t.end()
})
