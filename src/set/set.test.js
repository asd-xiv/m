import test from "tape"
import { set } from ".."

test("set", t => {
  const source = { lorem: "ipsum" }

  t.deepEqual(
    set("lorem", "42")(source),
    { lorem: "42" },
    "Set existing property overwrites value"
  )

  t.deepEqual(
    set("dolor", 42)(source),
    { lorem: "ipsum", dolor: 42 },
    "Set non-existing property"
  )

  t.notEqual(
    set("lorem", "ipsum")(source),
    source,
    "Result object is a new object (shallow clone)"
  )

  t.end()
})
