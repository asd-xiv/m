import test from "tape"

import { partitionWith } from "./partition-with.js"
import { isSomething } from "../../is/is.js"

class Item {
  id = 1
}

test("partitionWith - uncurried", t => {
  t.deepEqual(
    partitionWith({ id: isSomething }, [{ id: 1 }, {}, { id: 2 }]),
    [[{ id: 1 }, { id: 2 }], [{}]],
    "given [a matcher and objects] should [split by match]"
  )

  t.deepEqual(
    partitionWith({ id: isSomething, name: "test" }, [
      { id: 1, name: "foo" },
      { id: 2, name: "test" },
      { id: 3, name: "test" },
    ]),
    [
      [
        { id: 2, name: "test" },
        { id: 3, name: "test" },
      ],
      [{ id: 1, name: "foo" }],
    ],
    "given [a multi-field matcher] should [split by all fields matching]"
  )

  t.deepEqual(
    partitionWith({ "!id": 2 }, [{ lorem: 2 }, { lorem: 3 }, { id: 2 }]),
    [[{ lorem: 2 }, { lorem: 3 }], [{ id: 2 }]],
    "given [a negation matcher] should [split by negated match]"
  )

  t.deepEqual(
    partitionWith({ id: isSomething }, [] as { id: number }[]),
    [[], []],
    "given [an empty array] should [return two empty arrays]"
  )

  {
    const numbers: { n: number }[] = [{ n: Number.NaN }, { n: 1 }]

    t.deepEqual(
      partitionWith({ n: Number.NaN }, numbers),
      [[{ n: Number.NaN }], [{ n: 1 }]],
      "given [NaN as the value to match] should [match a NaN, SameValueZero as Array.prototype.includes]"
    )
  }

  {
    const items: { toString?: unknown }[] = [{}]

    t.deepEqual(
      partitionWith({ toString: isSomething }, items),
      [[], [{}]],
      "given [a key the object only inherits] should [not read it, own keys only]"
    )
  }

  t.end()
})

test("partitionWith - curried", t => {
  {
    const treeNodes: { id: number; parentId: unknown }[] = [
      { id: 1, parentId: undefined },
      { id: 2, parentId: 1 },
    ]

    t.deepEqual(
      partitionWith({ parentId: isSomething })(treeNodes),
      [[{ id: 2, parentId: 1 }], [{ id: 1, parentId: undefined }]],
      "given [curried matcher] should [split by match]"
    )
  }

  {
    const users: { active: boolean; name: string }[] = [
      { active: true, name: "a" },
      { active: false, name: "b" },
    ]

    t.deepEqual(
      partitionWith({ active: true })(users),
      [[{ active: true, name: "a" }], [{ active: false, name: "b" }]],
      "given [curried value matcher] should [split by exact value match]"
    )
  }

  t.end()
})

test("partitionWith - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      partitionWith(42, [{ id: 1 }])
    },
    /expected 'match' to be 'Object', got 'Number'/,
    "given [a number as match] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      partitionWith(null)
    },
    /expected 'match' to be 'Object', got 'Null'/,
    "given [null as match, curried] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      partitionWith({ id: 1 }, "not-an-array")
    },
    /@asd14\/m\/partitionWith: expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError naming the function]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      partitionWith({ id: 1 }, [null, { id: 1 }])
    },
    /@asd14\/m\/partitionWith: expected 'input\[\*\]' to be 'Object', got 'Null'/,
    "given [an array with a null item] should [throw TypeError naming the item]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      partitionWith({ id: 1 }, [new Item()])
    },
    /expected 'input\[\*\]' to be 'Object', got 'Item'/,
    "given [a class instance as an item] should [throw, only plain objects count]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      partitionWith(new Date(), [{ id: 1 }])
    },
    /expected 'match' to be 'Object', got 'Date'/,
    "given [a Date as match] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- an array is a pipe, not a value
      partitionWith({ tags: ["a"] }, [{ tags: ["a"] }])
    },
    /@asd14\/m\/partitionWith: expected 'match.tags\[0\]' to be 'Function', got 'String'/,
    "given [an array as a matcher value] should [throw, an array is a pipe]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      partitionWith({ tags: [] })
    },
    /expected 'match.tags' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe as a matcher value] should [throw at the first call]"
  )

  t.deepEqual(
    partitionWith(
      // @ts-expect-error -- testing runtime validation
      { id: (input: number) => input },
      [{ id: 1 }]
    ),
    [[], [{ id: 1 }]],
    "given [a matcher predicate returning a truthy non-boolean] should [not match]"
  )

  t.end()
})
