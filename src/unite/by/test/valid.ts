import test from "tape"

import { uniteBy } from "../unite-by.js"

type Item = { id: number; v: string }

const byId = (a: Item, b: Item) => a.id === b.id

test("uniteBy - valid", t => {
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

  // Curried
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
