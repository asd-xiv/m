import test from "tape"
import { bottom } from ".."

test("bottom", t => {
  t.deepEquals(
    bottom([1, 2, 3]),
    [2, 3],
    "3 length [] should return [] with last 2 elm"
  )
  t.deepEquals(bottom([1, 2]), [2], "2 length [] should return [] with 1 elm")
  t.deepEquals(bottom([1]), [], "1 length [] should return empty []")

  t.deepEquals(bottom([]), [], "Empty [] should return empty []")
  t.deepEquals(bottom(2, 2), [], "Non-array should return empty []")
  t.deepEquals(bottom("asd", []), [], "Non-numeric Limit should return []")

  t.deepEquals(bottom(2)([1, 2, 3]), [2, 3], "Limit and [], curried")
  t.deepEquals(bottom(2, [1, 2, 3]), [2, 3], "Limit and [], un-curried")
  t.deepEquals(bottom(2)("asd"), "sd", "Limit and string, curried")
  t.deepEquals(bottom(2, "asd"), "sd", "Limit and string, un-curried")

  t.deepEquals(
    bottom(3, [1, 2]),
    [1, 2],
    "Limit grater than max elements should return all elements"
  )

  t.end()
})
