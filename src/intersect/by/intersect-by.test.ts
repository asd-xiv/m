import test from "tape"

import { intersectBy } from "./intersect-by.js"

type Item = { id: number; v: string }

const byId = (a: Item, b: Item) => a.id === b.id

test("intersectBy - uncurried", t => {
  t.deepEqual(
    intersectBy(
      byId,
      [
        { id: 1, v: "a" },
        { id: 2, v: "b" },
      ],
      [
        { id: 2, v: "c" },
        { id: 3, v: "d" },
      ]
    ),
    [{ id: 2, v: "b" }],
    "given [equality by id] should [return items of the first array with a match]"
  )

  t.deepEqual(
    intersectBy(
      byId,
      [
        { id: 1, v: "a" },
        { id: 1, v: "b" },
      ],
      [{ id: 1, v: "c" }]
    ),
    [{ id: 1, v: "a" }],
    "given [equal items in the first array] should [keep the first of the group]"
  )

  t.deepEqual(
    intersectBy(Object.is, [NaN, 1], [NaN, 2]),
    [NaN],
    "given [Object.is as equality] should [intersect with the function you give]"
  )

  t.deepEqual(
    intersectBy(byId, [], [{ id: 1, v: "a" }]),
    [],
    "given [empty first array] should [return empty array]"
  )

  t.deepEqual(
    intersectBy(byId, [{ id: 1, v: "a" }], []),
    [],
    "given [empty second array] should [return empty array]"
  )

  t.deepEqual(
    intersectBy(
      (a: number, b: number) => (a === b ? 1 : 0) as unknown as boolean,
      [1],
      [1]
    ),
    [],
    "given [an equality function that returns a truthy non-boolean] should [not match]"
  )

  t.end()
})

test("intersectBy - curried", t => {
  t.deepEqual(
    intersectBy(byId, [
      { id: 1, v: "a" },
      { id: 2, v: "b" },
    ])([{ id: 2, v: "c" }]),
    [{ id: 2, v: "b" }],
    "given [equality by id, curried with first array] should [intersect]"
  )

  t.end()
})

test("intersectBy - invalid input", t => {
  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => intersectBy(byId),
    /expected 'a' to be 'Array', got 'Undefined'/,
    "given [only the equality function] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => intersectBy("not a function", [], []),
    /expected 'fn' to be 'Function', got 'String'/,
    "given [a string as equality function] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => intersectBy(byId, 42, []),
    /expected 'a' to be 'Array', got 'Number'/,
    "given [a number as first array] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => intersectBy(byId, [], "abc"),
    /expected 'b' to be 'Array', got 'String'/,
    "given [a string as second array] should [throw TypeError]"
  )

  t.end()
})
