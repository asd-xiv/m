import test from "tape"
import { upsertWith } from "./upsert"

test("upsertWith", t => {
  t.deepEquals(
    upsertWith({ id: 2 }, { id: 2, foo: "bar" })([{}]),
    [{}, { id: 2, foo: "bar" }],
    "Add if doesnt exist"
  )

  t.deepEquals(
    upsertWith(
      { id: 2 },
      { id: 2, title: [source => `${source} ipsum`], foo: "bar" }
    )([{ id: 2, title: "lorem" }]),
    [{ id: 2, title: "lorem ipsum", foo: "bar" }],
    "Update value if exists"
  )

  t.end()
})
