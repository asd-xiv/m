import test from "tape"
import { prepend } from "./prepend"

test("prepend", t => {
  t.deepEquals(
    prepend([1, 2])([2, 3]),
    [1, 2, 2, 3],
    "Prepend 2 arrays - curried"
  )

  t.deepEquals(
    prepend([1, 2], [2, 3]),
    [1, 2, 2, 3],
    "Prepend 2 arrays - uncurried"
  )

  t.deepEquals(
    prepend("test", [2, 3]),
    ["test", 2, 3],
    "Prepend non-array to arrays"
  )

  t.deepEquals(prepend("lorem ", "ipsum"), "lorem ipsum", "Prepend 2 strings")

  t.deepEquals(prepend([])([]), [], "Prepend 2 empty arrays")

  t.end()
})
