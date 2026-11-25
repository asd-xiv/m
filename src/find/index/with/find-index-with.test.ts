import test from "tape"

import { findIndexWith } from "./find-index-with.js"
import { isSomething } from "../../../is/is.js"

const COMMENTS = [
  { id: 1, body: "" },
  { id: 2, body: "dolor" },
]

class Item {
  id = 1
}

test("findIndexWith - uncurried", t => {
  t.equal(
    findIndexWith({ id: 2 }, COMMENTS),
    1,
    "given [matcher with value, uncurried] should [return index 1]"
  )

  t.equal(
    findIndexWith({ id: isSomething }, [
      { id: undefined },
      { id: null },
      { id: 3 },
    ]),
    2,
    "given [matcher with isSomething predicate] should [return index of first matching element]"
  )

  {
    const numbers: { n: number }[] = [{ n: Number.NaN }, { n: 1 }]

    t.deepEqual(
      findIndexWith({ n: Number.NaN }, numbers),
      0,
      "given [NaN as the value to match] should [match a NaN, SameValueZero as Array.prototype.includes]"
    )
  }

  {
    const items: { toString?: unknown }[] = [{}]

    t.deepEqual(
      findIndexWith({ toString: isSomething }, items),
      -1,
      "given [a key the object only inherits] should [not read it, own keys only]"
    )
  }

  t.end()
})

test("findIndexWith - curried", t => {
  t.equal(
    findIndexWith({ id: 2 })(COMMENTS),
    1,
    "given [matcher with value, curried] should [return index 1]"
  )

  t.equal(
    findIndexWith({ id: 2 })([]),
    -1,
    "given [empty array] should [return -1]"
  )

  t.equal(
    findIndexWith({ id: 3 })(COMMENTS),
    -1,
    "given [no matching element] should [return -1]"
  )

  t.end()
})

test("findIndexWith - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      findIndexWith(42, COMMENTS)
    },
    /expected 'match' to be 'Object', got 'Number'/,
    "given [a number as match] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      findIndexWith({ id: 2 }, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      findIndexWith({ id: 1 }, "not-an-array")
    },
    /@asd14\/m\/findIndexWith: expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError naming the function]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      findIndexWith({ id: 1 }, [null, { id: 1 }])
    },
    /@asd14\/m\/findIndexWith: expected 'input\[\*\]' to be 'Object', got 'Null'/,
    "given [an array with a null item] should [throw TypeError naming the item]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      findIndexWith({ id: 1 }, [new Item()])
    },
    /expected 'input\[\*\]' to be 'Object', got 'Item'/,
    "given [a class instance as an item] should [throw, only plain objects count]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      findIndexWith(new Date(), [{ id: 1 }])
    },
    /expected 'match' to be 'Object', got 'Date'/,
    "given [a Date as match] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- an array is a pipe, not a value
      findIndexWith({ tags: ["a"] }, [{ tags: ["a"] }])
    },
    /@asd14\/m\/findIndexWith: expected 'match.tags\[0\]' to be 'Function', got 'String'/,
    "given [an array as a matcher value] should [throw, an array is a pipe]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      findIndexWith({ tags: [] })
    },
    /expected 'match.tags' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe as a matcher value] should [throw at the first call]"
  )

  t.deepEqual(
    findIndexWith(
      // @ts-expect-error -- testing runtime validation
      { id: (input: number) => input },
      [{ id: 1 }]
    ),
    -1,
    "given [a matcher predicate returning a truthy non-boolean] should [not match]"
  )

  t.end()
})
