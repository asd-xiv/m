import test from "tape"

import { filterWith } from "./filter-with.js"
import { isSomething } from "../../is/is.js"

class Item {
  id = 1
}

test("filterWith - uncurried", t => {
  t.deepEqual(
    filterWith({ id: isSomething }, [{}, { id: 2 }, { id: null }]),
    [{ id: 2 }],
    "given [a matcher and an array of objects] should [return only matching elements]"
  )

  t.deepEqual(
    filterWith({ id: isSomething, name: "test" }, [
      { id: 1, name: "foo" },
      { id: 2, name: "test" },
      { id: 3, name: "test" },
    ]),
    [
      { id: 2, name: "test" },
      { id: 3, name: "test" },
    ],
    "given [a matcher with multiple fields] should [return only elements satisfying all fields]"
  )

  t.deepEqual(
    filterWith({ "!id": 2 }, [{ lorem: 2 }, { lorem: 3 }, { id: 2 }]),
    [{ lorem: 2 }, { lorem: 3 }],
    "given [a negation matcher] should [return elements that dont match]"
  )

  t.deepEqual(
    filterWith({ id: isSomething }, [] as { id: number }[]),
    [],
    "given [an empty array] should [return an empty array]"
  )

  {
    const numbers: { n: number }[] = [{ n: Number.NaN }, { n: 1 }]

    t.deepEqual(
      filterWith({ n: Number.NaN }, numbers),
      [{ n: Number.NaN }],
      "given [NaN as the value to match] should [match a NaN, SameValueZero as Array.prototype.includes]"
    )
  }

  {
    const items: { toString?: unknown }[] = [{}]

    t.deepEqual(
      filterWith({ toString: isSomething }, items),
      [],
      "given [a key the object only inherits] should [not read it, own keys only]"
    )
  }

  {
    // A "__proto__" key stays an own key
    const item = JSON.parse('{"__proto__": 1}') as Record<string, unknown>

    t.deepEqual(
      filterWith({ ["__proto__"]: 1 }, [item, {}]),
      [item],
      "given [a matcher with a __proto__ key] should [read it as an own key]"
    )
  }

  t.end()
})

test("filterWith - curried", t => {
  t.deepEqual(
    filterWith({
      id: isSomething,
      name: isSomething,
    })([
      { id: 1, name: "lorem" },
      { id: 2, name: "foo" },
      { id: 3, name: "test" },
    ]),
    [
      { id: 1, name: "lorem" },
      { id: 2, name: "foo" },
      { id: 3, name: "test" },
    ],
    "given [a matcher where all elements satisfy, curried] should [return all elements]"
  )

  t.end()
})

test("filterWith - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      filterWith(42, [{ id: 1 }])
    },
    /expected 'match' to be 'Object', got 'Number'/,
    "given [a number as match] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      filterWith({ id: 1 }, "not-an-array")
    },
    /@asd14\/m\/filterWith: expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError naming the function]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      filterWith({ id: 1 }, [null, { id: 1 }])
    },
    /@asd14\/m\/filterWith: expected 'input\[\*\]' to be 'Object', got 'Null'/,
    "given [an array with a null item] should [throw TypeError naming the item]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      filterWith({ id: 1 }, [new Item()])
    },
    /expected 'input\[\*\]' to be 'Object', got 'Item'/,
    "given [a class instance as an item] should [throw, only plain objects count]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      filterWith(new Date(), [{ id: 1 }])
    },
    /expected 'match' to be 'Object', got 'Date'/,
    "given [a Date as match] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- an array is a pipe, not a value
      filterWith({ tags: ["a"] }, [{ tags: ["a"] }])
    },
    /@asd14\/m\/filterWith: expected 'match.tags\[0\]' to be 'Function', got 'String'/,
    "given [an array as a matcher value] should [throw, an array is a pipe]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      filterWith({ tags: [] })
    },
    /expected 'match.tags' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe as a matcher value] should [throw at the first call]"
  )

  t.deepEqual(
    filterWith(
      // @ts-expect-error -- testing runtime validation
      { id: (input: number) => input },
      [{ id: 1 }]
    ),
    [],
    "given [a matcher predicate returning a truthy non-boolean] should [not match]"
  )

  t.end()
})
