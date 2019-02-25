const test = require("tape")
const upsertBy = require("./upsert-by")

test("array::upsertBy", t => {
  t.deepEquals(
    upsertBy({ id: 2 }, { id: 2, foo: "bar" })([{}]),
    [{}, { id: 2, foo: "bar" }],
    "Add if doesnt exist"
  )

  t.deepEquals(
    upsertBy({ id: 2 }, { id: 2, foo: "bar" })([{ id: 2 }]),
    [{ id: 2, foo: "bar" }],
    "Update value if exists"
  )

  t.end()
})
