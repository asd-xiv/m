import test from "tape"

import { allWith } from "./all-with.js"
import { isSomething } from "../../is/is.js"

class Item {
  id = 1
}

test("allWith - uncurried", t => {
  t.equal(
    allWith({ id: isSomething }, [{}, { id: 2 }, {}]),
    false,
    "given [array of objects who's items dont all satisfy matcher subset] should [return false]"
  )

  t.equal(
    allWith({ id: isSomething, name: "test" }, [
      { id: 1, name: "foo" },
      { id: 2, name: "bar" },
      { id: 3, name: "test" },
    ]),
    false,
    "given [array of objects who's items dont all satisfy matcher subset (multiple fields)] should [return false]"
  )

  {
    const numbers: { n: number }[] = [{ n: Number.NaN }, { n: 1 }]

    t.deepEqual(
      allWith({ n: Number.NaN }, numbers),
      false,
      "given [NaN as the value to match] should [match a NaN, SameValueZero as Array.prototype.includes]"
    )
  }

  {
    const items: { toString?: unknown }[] = [{}]

    t.deepEqual(
      allWith({ toString: isSomething }, items),
      false,
      "given [a key the object only inherits] should [not read it, own keys only]"
    )
  }

  t.end()
})

test("allWith - curried", t => {
  t.equal(
    allWith({
      id: isSomething,
      name: isSomething,
    })([
      { id: 1, name: "lorem" },
      { id: 2, name: "foo" },
      { id: 3, name: "test" },
    ]),
    true,
    "given [array of objects who's items all satisfy matcher subset (multiple fields)] should [return true]"
  )

  t.end()
})

test("allWith - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => allWith(42, [{ id: 1 }]),
    /expected 'match' to be 'Object', got 'Number'/,
    "given [a number as matcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => allWith("foo", [{ id: 1 }]),
    /expected 'match' to be 'Object', got 'String'/,
    "given [a string as matcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => allWith(null, [{ id: 1 }]),
    /expected 'match' to be 'Object', got 'Null'/,
    "given [null as matcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => allWith([1, 2], [{ id: 1 }]),
    /expected 'match' to be 'Object', got 'Array'/,
    "given [an array as matcher] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      allWith({ id: 1 }, "not-an-array")
    },
    /@asd14\/m\/allWith: expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError naming the function]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      allWith({ id: 1 }, [null, { id: 1 }])
    },
    /@asd14\/m\/allWith: expected 'input\[\*\]' to be 'Object', got 'Null'/,
    "given [an array with a null item] should [throw TypeError naming the item]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      allWith({ id: 1 }, [new Item()])
    },
    /expected 'input\[\*\]' to be 'Object', got 'Item'/,
    "given [a class instance as an item] should [throw, only plain objects count]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      allWith(new Date(), [{ id: 1 }])
    },
    /expected 'match' to be 'Object', got 'Date'/,
    "given [a Date as match] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- an array is a pipe, not a value
      allWith({ tags: ["a"] }, [{ tags: ["a"] }])
    },
    /@asd14\/m\/allWith: expected 'match.tags\[0\]' to be 'Function', got 'String'/,
    "given [an array as a matcher value] should [throw, an array is a pipe]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      allWith({ tags: [] })
    },
    /expected 'match.tags' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe as a matcher value] should [throw at the first call]"
  )

  t.deepEqual(
    allWith(
      // @ts-expect-error -- testing runtime validation
      { id: (input: number) => input },
      [{ id: 1 }]
    ),
    false,
    "given [a matcher predicate returning a truthy non-boolean] should [not match]"
  )

  t.end()
})
