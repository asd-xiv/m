import test from "tape"

import { removeWith } from "./remove-with.js"
import { isSomething } from "../../is/is.js"

test("removeWith - uncurried", t => {
  t.deepEqual(
    removeWith({ author: null }, [
      { id: 1, author: null },
      { id: 2, author: null },
      { id: 3, author: "Joe" },
    ]),
    [{ id: 3, author: "Joe" }],
    "given [a matcher with null value] should [remove elements where field is null]"
  )

  t.deepEqual(
    removeWith({ subject: "Math", score: 10 }, [
      { id: 1, subject: "CS", score: 1 },
      { id: 2, subject: "Math", score: 10 },
      { id: 3, subject: "Math", score: 10 },
    ]),
    [{ id: 1, subject: "CS", score: 1 }],
    "given [a multi-field value matcher] should [remove only elements satisfying all fields]"
  )

  t.deepEqual(
    removeWith({ id: 1 }, [] as Array<{ id: number }>),
    [],
    "given [an empty array] should [return an empty array]"
  )

  t.deepEqual(
    removeWith({ "!id": 2 }, [{ lorem: 2 }, { lorem: 3 }, { id: 2 }]),
    [{ id: 2 }],
    "given [a negation matcher] should [remove elements that dont have the field]"
  )

  const input = [
    { id: 1, author: null },
    { id: 2, author: "Joe" },
  ]
  const result = removeWith({ author: null }, input)

  t.notEqual(
    result,
    input,
    "given [an array] should [return a new array instance]"
  )

  t.deepEqual(
    input,
    [
      { id: 1, author: null },
      { id: 2, author: "Joe" },
    ],
    "given [an array] should [not mutate the original]"
  )

  t.end()
})

test("removeWith - curried", t => {
  t.deepEqual(
    removeWith({
      id: isSomething,
      name: isSomething,
    })([
      { id: 1, name: "lorem" },
      { id: undefined, name: undefined },
      { id: 3, name: "test" },
    ]),
    [{ id: undefined, name: undefined }],
    "given [a matcher with predicates, curried] should [remove matching elements]"
  )

  t.end()
})

test("removeWith - NaN and pipes", t => {
  t.deepEqual(
    removeWith({ score: Number.NaN }, [
      { id: 1, score: Number.NaN },
      { id: 2, score: 3 },
    ]),
    [{ id: 2, score: 3 }],
    "given [a NaN value matcher] should [remove elements with NaN, SameValueZero]"
  )

  {
    const items = [{ tags: ["a"] }, { tags: [] }]
    const countTags = (tags: string[]): number => tags.length
    const isZero = (count: number): boolean => count === 0

    t.deepEqual(
      removeWith({ tags: [countTags, isZero] }, items),
      [{ tags: ["a"] }],
      "given [an array as matcher value] should [use it as a predicate pipe]"
    )
  }

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => removeWith({ id: 1 }, [null]),
    /@asd14\/m\/removeWith: expected 'input\[\*\]' to be 'Object', got 'Null'/,
    "given [a null item] should [throw TypeError naming input[*]]"
  )

  t.end()
})

test("removeWith - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => removeWith(42, [{ id: 1 }]),
    /expected 'match' to be 'Object', got 'Number'/,
    "given [a number as matcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => removeWith("foo", [{ id: 1 }]),
    /expected 'match' to be 'Object', got 'String'/,
    "given [a string as matcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => removeWith(null, [{ id: 1 }]),
    /expected 'match' to be 'Object', got 'Null'/,
    "given [null as matcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => removeWith([1, 2], [{ id: 1 }]),
    /expected 'match' to be 'Object', got 'Array'/,
    "given [an array as matcher] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      removeWith({ id: 1 }, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [non-array input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      removeWith({ id: 1 })(42)
    },
    /expected 'input' to be 'Array', got 'Number'/,
    "given [non-array input, curried] should [throw TypeError]"
  )

  t.end()
})
