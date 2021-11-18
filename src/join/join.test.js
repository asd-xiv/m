import test from "tape"

import { join, joinBy } from "./join.js"

test("join", t => {
  t.deepEqual(
    join([], [1, 2, 3]),
    [1, 2, 3],
    "given [empty first array] should [return contents of second array]"
  )

  t.deepEqual(
    join([1, 2, 3], []),
    [1, 2, 3],
    "given [empty second array] should [return contents of first array]"
  )

  t.deepEqual(
    join([1, 1, 2, 3, 3], [3, 3, 4, 4, 5]),
    [1, 2, 3, 4, 5],
    "given [two non empty arrays with common items] should [return distinct items of both arrays]"
  )

  t.deepEqual(
    join([1, 2])([3, 4, 5]),
    [1, 2, 3, 4, 5],
    "given [two non empty arrays without common items] should [return array with items from both arrays]"
  )

  t.end()
})

test("joinBy", t => {
  t.deepEqual(
    joinBy(
      (a, b) => a.id === b.id,
      (a, b) => ({ ...a, ...b }),
      [{ id: 1, overwrite: 1 }, { id: 2 }, { id: 2 }],
      [{ id: 1, overwrite: 2, foo: "bar" }, { id: 3 }]
    ),
    [{ id: 1, overwrite: 2, foo: "bar" }, { id: 2 }, { id: 3 }],
    "given [two non empty object arrays with common items] should [return array with items from both arrays, with merged values for common ones]"
  )

  t.end()
})
