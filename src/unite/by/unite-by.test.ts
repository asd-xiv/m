import test from "tape"

import { uniteBy } from "./unite-by.js"

type Item = { id: number; v: string }

const byId = (a: Item, b: Item) => a.id === b.id

test("uniteBy - uncurried", t => {
  t.deepEqual(
    uniteBy(
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
    [
      { id: 1, v: "a" },
      { id: 2, v: "b" },
      { id: 3, v: "d" },
    ],
    "given [equality by id, uncurried] should [unite keeping first occurrence]"
  )

  t.deepEqual(
    uniteBy(Object.is, [NaN, 1], [NaN, 2]),
    [NaN, 1, 2],
    "given [Object.is as equality] should [unite with the function you give]"
  )

  t.deepEqual(
    uniteBy(byId, [], [{ id: 1, v: "a" }]),
    [{ id: 1, v: "a" }],
    "given [empty first array] should [return second array]"
  )

  t.end()
})

test("uniteBy - curried", t => {
  t.deepEqual(
    uniteBy(byId, [{ id: 1, v: "a" }])([
      { id: 1, v: "b" },
      { id: 2, v: "c" },
    ]),
    [
      { id: 1, v: "a" },
      { id: 2, v: "c" },
    ],
    "given [equality by id, curried with first array] should [unite]"
  )

  t.end()
})

test("uniteBy - invalid input", t => {
  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => uniteBy(byId),
    /expected 'a' to be 'Array', got 'Undefined'/,
    "given [the removed (fn) form] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => uniteBy("not a function", [], []),
    /expected 'fn' to be 'Function', got 'String'/,
    "given [a string as equality function] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => uniteBy(byId, 42, []),
    /expected 'a' to be 'Array', got 'Number'/,
    "given [a number as first array] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => uniteBy(byId, [], "abc"),
    /expected 'b' to be 'Array', got 'String'/,
    "given [a string as second array] should [throw TypeError]"
  )

  t.end()
})
