import test from "tape"
import { tail } from ".."

test("tail", t => {
  t.equals(tail([1, 2, 3]), 3, "Get last element from n array")
  t.equals(tail([1]), 1, "Get last element of an 1 array")

  t.equals(tail("xyz"), "z", "From string should return last char")
  t.equals(tail([]), undefined, "Get last element of empty array")

  t.equals(tail({}), undefined, "Get last element of empty object")

  t.end()
})
