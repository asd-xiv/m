import test from "tape"

import { intersect, intersectBy } from "./intersect.js"

test("intersect", t => {
  t.deepEqual(
    intersect([], [1, 2, 3]),
    [],
    "given [empty first array] should [return an empty array]"
  )

  t.deepEqual(
    intersect([1, 2, 3], []),
    [],
    "given [empty second array] should [return an empty array]"
  )

  t.deepEqual(
    intersect([1, 2, 3, 3, 4], [3, 3, 4, 5]),
    [3, 4],
    "given [two arrays with common items] should [return an array containing those items]"
  )

  t.deepEqual(
    intersect([1, 2, 2], [3, 3, 4, 5]),
    [],
    "given [two non empty arrays without common items] should [return an empty array]"
  )

  t.end()
})

test("intersectBy", t => {
  t.deepEqual(
    intersectBy(
      (a, b) => a.id === b.id,
      (a, b) => ({ ...a, ...b }),
      [
        { id: 1, lorem: "ipsum" },
        { id: 2, foo: "bar1" },
        { id: 2, foo: "bar2" },
      ],
      [
        { id: 2, comments: [] },
        { id: 3, comments: [] },
      ]
    ),
    [{ id: 2, foo: "bar1", comments: [] }],
    "given [two non empty arrays common object items] should [return an array containing those objects]"
  )

  t.end()
})
