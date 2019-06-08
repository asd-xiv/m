import test from "tape"
import { tail } from ".."

test("tail", t => {
  t.equals(tail([1, 2, 3]), 3, "Get last element of number array")

  t.equals(tail([]), null, "Get last element of empty array")

  t.end()
})
