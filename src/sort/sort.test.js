/* eslint-disable unicorn/no-null */

import test from "tape"
import { sort, sortWith } from "./sort"

test("sort(With)", t => {
  const source = [
    { id: 5, position: null },
    { id: 3 },
    { id: 1, position: 3 },
    { id: 2, position: 2 },
    { id: 4, position: 5 },
  ]

  t.deepEqual(
    sort((a, b) => a.id - b.id)(source),
    [
      { id: 1, position: 3 },
      { id: 2, position: 2 },
      { id: 3 },
      { id: 4, position: 5 },
      { id: 5, position: null },
    ],
    "Sort array of objects by field"
  )

  t.notEqual(
    sort((a, b) => a.id - b.id)(source),
    source,
    "Returned array is different (immutability)"
  )

  t.notEqual(sortWith("position")(source), source, "Imutable")

  t.deepEqual(
    sortWith("position")(sortWith("position")(source)),
    [
      { id: 2, position: 2 },
      { id: 1, position: 3 },
      { id: 4, position: 5 },
      { id: 5, position: null },
      { id: 3 },
    ],
    "Idempotent"
  )

  t.deepEqual(
    sortWith("position")(source),
    [
      { id: 2, position: 2 },
      { id: 1, position: 3 },
      { id: 4, position: 5 },
      { id: 5, position: null },
      { id: 3 },
    ],
    "Sort asc by field with undefined at bottom"
  )

  t.deepEqual(
    sortWith("position", "desc")(source),
    [
      { id: 4, position: 5 },
      { id: 1, position: 3 },
      { id: 2, position: 2 },
      { id: 5, position: null },
      { id: 3 },
    ],
    "Sort desc by field with undefined at bottom"
  )

  t.end()
})
