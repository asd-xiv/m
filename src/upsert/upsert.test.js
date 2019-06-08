import test from "tape"
import { upsert } from ".."

test("upsertBy", t => {
  t.deepEquals(
    upsert({ id: 2 }, { id: 2, foo: "bar" })([{}]),
    [{}, { id: 2, foo: "bar" }],
    "Add if doesnt exist"
  )

  t.deepEquals(
    upsert({ id: 2 }, { id: 2, foo: "bar" })([{ id: 2 }]),
    [{ id: 2, foo: "bar" }],
    "Update value if exists"
  )

  t.end()
})
