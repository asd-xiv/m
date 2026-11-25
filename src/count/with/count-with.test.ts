import test from "tape"

import { countWith } from "./count-with.js"
import { isSomething } from "../../is/is.js"

const SCORES = [
  { name: "Bob", score: 1, subject: "CS" },
  { name: "Alice", score: 10, subject: "Math" },
  { name: "Hatter", score: 10, subject: "Math" },
]

class Item {
  id = 1
}

test("countWith - uncurried", t => {
  t.equal(
    countWith({ subject: "Math" }, SCORES),
    2,
    "given [a value matcher and an array] should [count matching items]"
  )

  t.equal(
    countWith({ subject: "Math", score: 10 }, SCORES),
    2,
    "given [a multi-field value matcher] should [count items matching all fields]"
  )

  t.equal(
    countWith({ score: isSomething }, SCORES),
    3,
    "given [a predicate matcher] should [count items where predicate returns true]"
  )

  {
    t.equal(
      countWith({ id: 1 }, [] as Array<{ id: number }>),
      0,
      "given [a matcher and an empty array] should [return 0]"
    )
  }

  {
    const numbers: { n: number }[] = [{ n: Number.NaN }, { n: 1 }]

    t.deepEqual(
      countWith({ n: Number.NaN }, numbers),
      1,
      "given [NaN as the value to match] should [match a NaN, SameValueZero as Array.prototype.includes]"
    )
  }

  {
    const items: { toString?: unknown }[] = [{}]

    t.deepEqual(
      countWith({ toString: isSomething }, items),
      0,
      "given [a key the object only inherits] should [not read it, own keys only]"
    )
  }

  t.end()
})

test("countWith - curried", t => {
  t.equal(
    countWith({ subject: "Math" })(SCORES),
    2,
    "given [a matcher] should [return a function that counts matching items]"
  )

  t.end()
})

test("countWith - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => countWith("foo", SCORES),
    /expected 'match' to be 'Object', got 'String'/,
    "given [a string as matcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => countWith(null, SCORES),
    /expected 'match' to be 'Object', got 'Null'/,
    "given [null as matcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => countWith([1, 2], SCORES),
    /expected 'match' to be 'Object', got 'Array'/,
    "given [an array as matcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => countWith({ subject: "Math" }, "not-an-array"),
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => countWith({ subject: "Math" })(42),
    /expected 'input' to be 'Array', got 'Number'/,
    "given [curried matcher and a number as input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      countWith({ id: 1 }, "not-an-array")
    },
    /@asd14\/m\/countWith: expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError naming the function]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      countWith({ id: 1 }, [null, { id: 1 }])
    },
    /@asd14\/m\/countWith: expected 'input\[\*\]' to be 'Object', got 'Null'/,
    "given [an array with a null item] should [throw TypeError naming the item]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      countWith({ id: 1 }, [new Item()])
    },
    /expected 'input\[\*\]' to be 'Object', got 'Item'/,
    "given [a class instance as an item] should [throw, only plain objects count]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      countWith(new Date(), [{ id: 1 }])
    },
    /expected 'match' to be 'Object', got 'Date'/,
    "given [a Date as match] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- an array is a pipe, not a value
      countWith({ tags: ["a"] }, [{ tags: ["a"] }])
    },
    /@asd14\/m\/countWith: expected 'match.tags\[0\]' to be 'Function', got 'String'/,
    "given [an array as a matcher value] should [throw, an array is a pipe]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      countWith({ tags: [] })
    },
    /expected 'match.tags' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe as a matcher value] should [throw at the first call]"
  )

  t.deepEqual(
    countWith(
      // @ts-expect-error -- testing runtime validation
      { id: (input: number) => input },
      [{ id: 1 }]
    ),
    0,
    "given [a matcher predicate returning a truthy non-boolean] should [not match]"
  )

  t.end()
})
