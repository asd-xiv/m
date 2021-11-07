import test from "tape"

import { findIndex, findIndexWith } from "./find-index.js"

test("findIndex", t => {
  const comments = [
    { id: 1, body: "" },
    { id: 2, body: "dolor" },
  ]

  t.equals(
    findIndex(element => element.id === 2)(comments),
    1,
    "index with id:2 should be 1"
  )

  t.equals(
    findIndex([element => element.id, item => item === 2], comments),
    1,
    "index with id:2 should be 1 (uncurried multipe functions)"
  )

  t.equals(
    findIndex(element => element.id === 3)(comments),
    -1,
    "index with id:3 should be -1 (not found)"
  )

  t.end()
})

test("findIndexWith", t => {
  const comments = [
    { id: 1, body: "" },
    { id: 2, body: "dolor" },
  ]

  t.equals(
    findIndexWith({ id: 2 })([]),
    -1,
    "index of id:2 in empty array should be -1"
  )

  t.equals(findIndexWith({ id: 2 })(comments), 1, "index of id:2 should be 1")

  t.equals(
    findIndexWith({ id: 3 })(comments),
    -1,
    "index id:3 should be -1 (not found)"
  )

  t.end()
})
