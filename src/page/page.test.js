import test from "tape"

import { page } from "./page.js"

test("page", t => {
  t.deepEqual(
    page()([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "Page with default"
  )

  t.deepEqual(
    page({ offset: 1, limit: 5 })([1, 2, 3, 4, 5, 6, 7, 8]),
    [2, 3, 4, 5, 6],
    "5 length page starting from position 1"
  )

  t.deepEqual(
    page({ offset: 0, limit: 5 })([1, 2, 3]),
    [1, 2, 3],
    "limit over source lenght"
  )

  t.deepEqual(
    page({ offset: 11, limit: 5 })([1, 2, 3]),
    [],
    "offset over source lenght"
  )

  t.end()
})
