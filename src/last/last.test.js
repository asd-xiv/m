import test from "tape"
import { last } from ".."

test("array::last", t => {
  t.equal(last([1, 2, 3]), 3, "last element inside non-empty array")

  t.equal(last([]), undefined, "undefined in empty array")

  t.end()
})
