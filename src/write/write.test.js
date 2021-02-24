import test from "tape"

import { write } from "./write"

test("write", t => {
  const source = { lorem: "ipsum" }

  t.deepEqual(
    write("lorem", "42")(source),
    { lorem: "42" },
    "Set existing property overwrites value"
  )

  t.deepEqual(
    write("dolor", 42)(source),
    { lorem: "ipsum", dolor: 42 },
    "Set non-existing property"
  )

  t.notEqual(
    write("lorem", "ipsum")(source),
    source,
    "Result object is a new object (shallow clone)"
  )

  t.end()
})
