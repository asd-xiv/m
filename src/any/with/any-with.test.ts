import test from "tape"

import { anyWith, hasWith } from "./any-with.js"
import { isSomething } from "../../is/is.js"

const isNumber = (input: unknown): boolean => Number.isFinite(input)

class Item {
  id = 1
}

test("anyWith - uncurried", t => {
  t.equal(
    anyWith(
      {
        id: isNumber,
        name: "lorem",
      },
      [
        { id: "uuid", name: "lorem" },
        { id: 2, name: "foo" },
        { id: 3, name: "lorem" },
      ]
    ),
    true,
    "given [a matcher with predicate and value and an array with a matching element] should [return true]"
  )

  t.equal(
    anyWith({ id: isSomething }, [{ id: 1 }, { id: 2 }]),
    true,
    "given [a matcher checking an existing field] should [return true]"
  )

  {
    const numbers: { n: number }[] = [{ n: Number.NaN }, { n: 1 }]

    t.deepEqual(
      anyWith({ n: Number.NaN }, numbers),
      true,
      "given [NaN as the value to match] should [match a NaN, SameValueZero as Array.prototype.includes]"
    )
  }

  {
    const items: { toString?: unknown }[] = [{}]

    t.deepEqual(
      anyWith({ toString: isSomething }, items),
      false,
      "given [a key the object only inherits] should [not read it, own keys only]"
    )
  }

  t.end()
})

test("anyWith - curried", t => {
  t.equal(
    anyWith({ tags: isSomething })([{ tags: undefined }, { tags: undefined }]),
    false,
    "given [a matcher checking a missing field, curried] should [return false]"
  )

  t.end()
})

test("anyWith - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => anyWith(42, [{ id: 1 }]),
    /expected 'match' to be 'Object', got 'Number'/,
    "given [a number as matcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => anyWith("foo", [{ id: 1 }]),
    /expected 'match' to be 'Object', got 'String'/,
    "given [a string as matcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => anyWith(null, [{ id: 1 }]),
    /expected 'match' to be 'Object', got 'Null'/,
    "given [null as matcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => anyWith([1, 2], [{ id: 1 }]),
    /expected 'match' to be 'Object', got 'Array'/,
    "given [an array as matcher] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      anyWith({ id: 1 }, "not-an-array")
    },
    /@asd14\/m\/anyWith: expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError naming the function]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      anyWith({ id: 1 }, [null, { id: 1 }])
    },
    /@asd14\/m\/anyWith: expected 'input\[\*\]' to be 'Object', got 'Null'/,
    "given [an array with a null item] should [throw TypeError naming the item]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      anyWith({ id: 1 }, [new Item()])
    },
    /expected 'input\[\*\]' to be 'Object', got 'Item'/,
    "given [a class instance as an item] should [throw, only plain objects count]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      anyWith(new Date(), [{ id: 1 }])
    },
    /expected 'match' to be 'Object', got 'Date'/,
    "given [a Date as match] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- an array is a pipe, not a value
      anyWith({ tags: ["a"] }, [{ tags: ["a"] }])
    },
    /@asd14\/m\/anyWith: expected 'match.tags\[0\]' to be 'Function', got 'String'/,
    "given [an array as a matcher value] should [throw, an array is a pipe]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      anyWith({ tags: [] })
    },
    /expected 'match.tags' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe as a matcher value] should [throw at the first call]"
  )

  t.deepEqual(
    anyWith(
      // @ts-expect-error -- testing runtime validation
      { id: (input: number) => input },
      [{ id: 1 }]
    ),
    false,
    "given [a matcher predicate returning a truthy non-boolean] should [not match]"
  )

  t.end()
})

test("anyWith - aliases", t => {
  t.equal(
    hasWith,
    anyWith,
    "given [hasWith export] should [be an alias for anyWith]"
  )

  t.end()
})
