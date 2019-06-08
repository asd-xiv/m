import test from "tape"
import { split } from ".."

test("split", t => {
  const source = "lorem,ipsum"

  t.deepEqual(
    split(",")(source),
    ["lorem", "ipsum"],
    "Split string into an array of 2 substrings"
  )

  t.end()
})
