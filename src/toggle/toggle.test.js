import test from "tape"

import { toggle } from "./toggle.js"

test("toggle", t => {
  t.deepEqual(
    toggle(2, [1, 2, 3]),
    [1, 3],
    "Toggle/remove existing element in array"
  )

  t.deepEqual(
    toggle(2)([1, "2", 3]),
    [1, "2", 3, 2],
    "Toggle/add non-existing element in array"
  )

  t.deepEqual(toggle(2)([]), [2], "Toggle/add element in empty array")

  t.end()
})
