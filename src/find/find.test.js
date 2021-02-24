/* eslint-disable unicorn/no-null */

import test from "tape"

import { find, findWith } from "./find"

test("find", t => {
  const comments = [
    { id: 1, body: "" },
    { id: 2, body: "dolor" },
  ]

  t.deepEqual(
    find([element => element.id, item => item === 2], null, comments),
    { id: 2, body: "dolor" },
    "find with id:2 should return found object (uncurried multipe functions)"
  )

  t.deepEqual(
    find(element => element.id === 2)(comments),
    { id: 2, body: "dolor" },
    "find with id:2 should return found object"
  )

  t.equal(
    find(element => element.id === 3)(comments),
    undefined,
    "find with id:3 should return undefined (not found)"
  )

  t.deepEqual(
    find(element => element.id === 3, {})(comments),
    {},
    "find with id:3 should return default not found value"
  )

  t.end()
})

test("findWith", t => {
  const comments = [
    { id: 1, body: "" },
    { id: 2, body: "dolor" },
  ]

  t.deepEqual(
    findWith({ id: 2 })([]),
    undefined,
    "find with id:2 in empty array should return undefined"
  )

  t.deepEqual(
    findWith({ id: 2 })(comments),
    { id: 2, body: "dolor" },
    "find with id:2 should return found object"
  )

  t.equals(
    findWith({ id: 3 })(comments),
    undefined,
    "find with id:3 should return undefined (not found)"
  )

  t.deepEquals(
    findWith({ id: 3 }, {})(comments),
    {},
    "find with id:3 should return default value (not found)"
  )
  t.end()
})
