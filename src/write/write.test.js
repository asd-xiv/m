import test from "tape"

import { write } from "./write.js"

test("write", t => {
  const input = { lorem: "ipsum" }

  t.deepEqual(
    write("lorem", "42")(input),
    { lorem: "42" },
    "Set existing property overwrites value"
  )

  t.deepEqual(
    write("dolor", 42)(input),
    { lorem: "ipsum", dolor: 42 },
    "Set non-existing property"
  )

  t.notEqual(
    write("lorem", "ipsum")(input),
    input,
    "Result object is a new object (shallow clone)"
  )

  t.end()
})
