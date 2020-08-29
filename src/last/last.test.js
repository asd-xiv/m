import test from "tape"
import { last } from ".."

test("last", t => {
  t.equals(last([1, 2, 3]), 3, "Get last element from n array")
  t.equals(last([1]), 1, "Get last element of an 1 array")

  t.equals(last("xyz"), "z", "From string should return last char")
  t.equals(last([]), undefined, "Get last element of empty array")

  t.equals(last({}), undefined, "Get last element of empty object")

  t.end()
})
