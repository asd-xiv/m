import test from "tape"

import { findWith } from "./find-with.js"
import { isSomething } from "../../is/is.js"

const COMMENTS = [
  { id: 1, body: "" },
  { id: 2, body: "dolor" },
]

class Item {
  id = 1
}

test("findWith - uncurried", t => {
  t.deepEqual(
    findWith({ id: 2 }, COMMENTS),
    { id: 2, body: "dolor" },
    "given [matcher with value, uncurried] should [return the matching element]"
  )

  t.deepEqual(
    findWith({ id: isSomething }, [{ id: undefined }, { id: null }, { id: 3 }]),
    { id: 3 },
    "given [matcher with isSomething predicate] should [return first element with truthy field]"
  )

  {
    const numbers: { n: number }[] = [{ n: Number.NaN }, { n: 1 }]

    t.deepEqual(
      findWith({ n: Number.NaN }, numbers),
      { n: Number.NaN },
      "given [NaN as the value to match] should [match a NaN, SameValueZero as Array.prototype.includes]"
    )
  }

  {
    const items: { toString?: unknown }[] = [{}]

    t.deepEqual(
      findWith({ toString: isSomething }, items),
      undefined,
      "given [a key the object only inherits] should [not read it, own keys only]"
    )
  }

  t.end()
})

test("findWith - curried", t => {
  t.deepEqual(
    findWith({ id: 2 })(COMMENTS),
    { id: 2, body: "dolor" },
    "given [matcher with value, curried] should [return the matching element]"
  )

  t.deepEqual(
    findWith({
      id: 2,
      body: (input: string) => input === "dolor",
    })(COMMENTS),
    { id: 2, body: "dolor" },
    "given [matcher with value and predicate fields] should [return the matching element]"
  )

  t.equal(
    findWith({ id: 2 })([]),
    undefined,
    "given [empty array] should [return undefined]"
  )

  t.equal(
    findWith({ id: 99 })(COMMENTS),
    undefined,
    "given [no matching element] should [return undefined]"
  )

  t.end()
})

test("findWith - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      findWith(42, COMMENTS)
    },
    /expected 'match' to be 'Object', got 'Number'/,
    "given [a number as match] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      findWith({ id: 2 }, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      findWith({ id: 1 }, "not-an-array")
    },
    /@asd14\/m\/findWith: expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError naming the function]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      findWith({ id: 1 }, [null, { id: 1 }])
    },
    /@asd14\/m\/findWith: expected 'input\[\*\]' to be 'Object', got 'Null'/,
    "given [an array with a null item] should [throw TypeError naming the item]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      findWith({ id: 1 }, [new Item()])
    },
    /expected 'input\[\*\]' to be 'Object', got 'Item'/,
    "given [a class instance as an item] should [throw, only plain objects count]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      findWith(new Date(), [{ id: 1 }])
    },
    /expected 'match' to be 'Object', got 'Date'/,
    "given [a Date as match] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- an array is a pipe, not a value
      findWith({ tags: ["a"] }, [{ tags: ["a"] }])
    },
    /@asd14\/m\/findWith: expected 'match.tags\[0\]' to be 'Function', got 'String'/,
    "given [an array as a matcher value] should [throw, an array is a pipe]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      findWith({ tags: [] })
    },
    /expected 'match.tags' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe as a matcher value] should [throw at the first call]"
  )

  t.deepEqual(
    findWith(
      // @ts-expect-error -- testing runtime validation
      { id: (input: number) => input },
      [{ id: 1 }]
    ),
    undefined,
    "given [a matcher predicate returning a truthy non-boolean] should [not match]"
  )

  t.end()
})
