import test from "tape"

import { inc } from "../inc/inc"
import { forEach } from "./for-each"

test("forEach", t => {
  {
    const temporary = []

    forEach(item => temporary.push(item))([1, 2, 3])

    t.deepEqual(temporary, [1, 2, 3], "Run function over each element of array")
  }

  {
    const temporary = []

    forEach([inc, item => temporary.push(item)], [1, 2, 3])

    t.deepEqual(
      temporary,
      [2, 3, 4],
      "Run piped functions over each element of array"
    )
  }

  t.end()
})
