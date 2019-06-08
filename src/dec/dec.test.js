import test from "tape"
import { dec } from ".."

test("dec", t => {
  t.equal(dec(2), 1, "Decrement number")

  t.end()
})
