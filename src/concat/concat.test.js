import test from "tape"
import { concat } from "./concat"

test("concat", t => {
  t.deepEquals(concat([1, 2])([2, 3]), [1, 2, 2, 3], "Concatenate 2 arrays")
  t.deepEquals(concat([])([]), [], "Concatenate 2 empty arrays")

  t.end()
})
