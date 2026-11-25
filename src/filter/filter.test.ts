import test from "tape"

import { filter } from "./filter.js"
import { isSomething } from "../is/is.js"

const isEven = (input: number) => input % 2 === 0

test("filter - uncurried", t => {
  t.deepEqual(
    filter(isEven, [1, 2, 3, 4, 5, 6]),
    [2, 4, 6],
    "given [isEven predicate and an array of numbers] should [return only even numbers]"
  )

  t.deepEqual(
    filter(
      (item: { id?: number | null }) => isSomething(item.id),
      [{}, { id: 2 }, { id: null }]
    ),
    [{ id: 2 }],
    "given [a predicate asserting the existence of .id field] should [return only elements with .id]"
  )

  t.deepEqual(
    filter(
      [(item: { items: number }) => item.items, (items: number) => items === 1],
      [
        { id: 2, items: 2 },
        { id: 3, items: 1 },
        { id: 4, items: 2 },
      ]
    ),
    [{ id: 3, items: 1 }],
    "given [a predicate pipe] should [filter using the composed predicate]"
  )

  t.deepEqual(
    filter(isEven, []),
    [],
    "given [an empty array] should [return an empty array]"
  )

  t.end()
})

test("filter - curried", t => {
  t.deepEqual(
    filter(isEven)([1, 2, 3, 4, 5, 6]),
    [2, 4, 6],
    "given [isEven predicate and an array of numbers, curried] should [return only even numbers]"
  )

  t.deepEqual(
    filter<{ id?: number | null }>(item => isSomething(item.id))([
      {},
      { id: 2 },
      { id: null },
    ]),
    [{ id: 2 }],
    "given [a curried predicate asserting the existence of .id field] should [return only elements with .id]"
  )

  {
    const immutableTestArray = [1, 2, 3]

    t.notEqual(
      filter(isEven)(immutableTestArray),
      immutableTestArray,
      "given [an array] should [return a new array instance]"
    )
  }

  t.end()
})

test("filter - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      filter(42, [1, 2])
    },
    /expected 'fn' to be 'Function' or 'Array', got 'Number'/,
    "given [a number as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      filter(isEven, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => filter([isEven, 1], [1, 2]),
    /@asd14\/m\/filter: expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a pipe with a non-function] should [throw TypeError naming the function and its position]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => filter([isEven, 1]),
    /expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a bad pipe in the curried form] should [throw at the first call]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => filter([], [1, 2]),
    /expected 'fn' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe] should [throw TypeError]"
  )

  {
    // A predicate passes only when it returns `true`
    const toNumber = (input: number) => input

    t.deepEqual(
      // @ts-expect-error -- testing runtime validation
      filter(toNumber, [0, 1, 2]),
      [],
      "given [a predicate returning a truthy non-boolean] should [not pass any element]"
    )
  }

  t.end()
})
