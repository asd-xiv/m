import test from "tape"
import { top } from ".."

test("top", t => {
  t.deepEquals(
    top([1, 2, 3]),
    [1, 2],
    "From 3 length array should return array with first 2 elements"
  )
  t.deepEquals(top([1, 2]), [1], "From [1,2] should return [1]")
  t.deepEquals(top([1]), [], "From [1] should return []")
  t.deepEquals(top([]), [], "From [] should return []")
  t.deepEquals(top(2), [], "From a non-array should return []")

  t.end()
})
