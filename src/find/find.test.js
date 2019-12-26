import test from "tape"
import { find, findWith } from ".."

test("array::find", t => {
  const comments = [
    { id: 1, body: "" },
    { id: 2, body: "dolor" },
  ]

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
    findWith({ id: 2 })([]),
    undefined,
    "find with id:2 in empty array should return undefined"
  )

  t.deepEqual(
    findWith({ id: 2 })(comments),
    { id: 2, body: "dolor" },
    "find with id:2 should return found object"
  )

  t.equal(
    findWith({ id: 3 })(comments),
    undefined,
    "find with id:3 should return undefined (not found)"
  )

  t.end()
})
