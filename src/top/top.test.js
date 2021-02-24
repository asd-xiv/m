import test from "tape"
import { top } from "./top"

test("top", t => {
  t.deepEquals(
    top([1, 2, 3]),
    [1, 2],
    "3 length [] should return [] with first 2 elm"
  )
  t.deepEquals(top([1, 2]), [1], "2 length [] should return [] with 1 elm")
  t.deepEquals(top([1]), [], "1 length [] should return empty []")

  t.deepEquals(top([]), [], "Empty [] should return empty []")
  t.deepEquals(top(2, 2), [], "Non-array should return empty []")
  t.deepEquals(top("asd", []), [], "Non-numeric Limit should return []")

  t.deepEquals(top(2)([1, 2, 3]), [1, 2], "Limit and [], curried")
  t.deepEquals(top(2, [1, 2]), [1, 2], "Limit and [], un-curried")
  t.deepEquals(top(2)("asd"), "as", "Limit and string, curried")
  t.deepEquals(top(2, "asd"), "as", "Limit and string, un-curried")

  t.deepEquals(
    top(3, [1, 2]),
    [1, 2],
    "Limit grater than max elements should return all elements"
  )

  t.end()
})
