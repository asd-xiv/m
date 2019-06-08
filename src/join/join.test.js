import test from "tape"
import { join } from ".."

test("join", t => {
  const source = ["lorem", "ipsum"]

  t.equals(join(",")(source), "lorem,ipsum", "Join array with 2 string into 1")

  t.end()
})
