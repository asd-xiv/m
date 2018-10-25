const test = require("tape")
const replace = require("./replace")

test("array||string::replace", t => {
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

  t.end()
})
