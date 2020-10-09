import test from "tape"

import { append } from "./append"

test("append", t => {
  t.deepEquals(
    append([1, 2])([2, 3]),
    [2, 3, 1, 2],
    "Append 2 arrays - curried"
  )

  t.deepEquals(
    append([1, 2], [2, 3]),
    [2, 3, 1, 2],
    "Append 2 arrays - uncurried"
  )

  t.deepEquals(
    append("test", [2, 3]),
    [2, 3, "test"],
    "Append non-array to arrays"
  )

  t.deepEquals(append(" ipsum", "lorem"), "lorem ipsum", "Append 2 strings")

  t.deepEquals(append([])([]), [], "Append 2 empty arrays")

  t.deepEquals(
    append()([1]),
    [1],
    "Append undefined should not change source array"
  )

  t.end()
})
