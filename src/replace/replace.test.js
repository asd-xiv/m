import test from "tape"
import { replace, replaceWith } from ".."

test("replace(With)", t => {
  t.equals(
    replace("test", "ipsum")("lorem test"),
    "lorem ipsum",
    "Replace substring in string"
  )

  t.equals(
    replace("testx", "ipsum")("lorem test"),
    "lorem test",
    "Replacement string does not exist"
  )

  t.deepEquals(
    replace("test", "ipsum")(["lorem", "test"]),
    ["lorem", "ipsum"],
    "Replace string element in array source"
  )

  t.deepEquals(
    replace("testx", "ipsum")(["lorem", "test"]),
    ["lorem", "test"],
    "Replacement string does not exist in array source"
  )

  const source = ["lorem", "test"]

  t.notEquals(replace("test", "ipsum")(source), source, "Imutable")

  t.deepEquals(
    replace("test", "ipsum")(replace("test", "ipsum")(["lorem", "test"])),
    ["lorem", "ipsum"],
    "Idempotent"
  )

  t.deepEqual(
    replaceWith({ id: 2 }, { id: 2, title: "boss", isBoss: true })([
      { id: 2, title: "minion" },
      { id: 3, title: "minion" },
    ]),
    [{ id: 2, title: "boss", isBoss: true }, { id: 3, title: "minion" }],
    "Replace existing object"
  )

  t.deepEqual(
    replaceWith({ "!name": "alice" }, { name: "bobby", title: "tables" })([
      { name: "alice", title: "first" },
      { name: "bob", title: "second" },
      { name: "george", title: "third" },
    ]),
    [
      { name: "alice", title: "first" },
      { name: "bobby", title: "tables" },
      { name: "bobby", title: "tables" },
    ],
    "Replace multiple objects by using negate in filter object"
  )

  t.deepEquals(
    replaceWith({ id: 2 }, item => ({
      ...item,
      content: ["new", "updated", "field"],
    }))([
      { id: 1, name: "foo", content: [] },
      { id: 2, name: "bar", content: [] },
    ]),
    [
      { id: 1, name: "foo", content: [] },
      { id: 2, name: "bar", content: ["new", "updated", "field"] },
    ],
    "Replace object with custom update function"
  )

  t.end()
})
