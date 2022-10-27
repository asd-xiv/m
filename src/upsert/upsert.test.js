import test from "tape"

import { upsertWith } from "./upsert.js"

test("upsertWith", t => {
  t.deepEquals(
    upsertWith({ id: 2 }, { id: 2, foo: "bar" })([{}]),
    [{}, { id: 2, foo: "bar" }],
    "Add if doesnt exist"
  )

  t.deepEquals(
    upsertWith(
      { id: 2 },
      { id: 2, title: input => `${input} ipsum`, foo: "bar" }
    )([{ id: 2, title: "lorem" }]),
    [{ id: 2, title: "lorem ipsum", foo: "bar" }],
    "Update value if exists"
  )

  t.deepEquals(
    upsertWith(
      { id: 1 },
      { id: 1, title: input => `${input} ipsum` }
    )([{ id: 2 }]),
    [{ id: 2 }, { id: 1, title: "undefined ipsum" }],
    "Update value if exists"
  )

  t.end()
})
