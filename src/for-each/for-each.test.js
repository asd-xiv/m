import test from "tape"

import { inc } from "../inc/inc"
import { forEach } from "./for-each"

test("forEach", t => {
  const tmp = []

  forEach(item => tmp.push(item))([1, 2, 3])

  t.deepEqual(tmp, [1, 2, 3], "Run function over each element of array")

  const tmp2 = []

  forEach([inc, item => tmp2.push(item)], [1, 2, 3])

  t.deepEqual(tmp2, [2, 3, 4], "Run piped functions over each element of array")

  t.end()
})
