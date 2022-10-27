import test from "tape"

import { pick } from "./pick.js"

test("pick", t => {
  const input = [
    {
      id: 1,
      position: 3,
      onlyHere: 1,
    },
    {
      id: 2,
      position: -1,
    },
  ]

  t.deepEqual(pick("position")(input), [3, -1], "Array with extracted field")

  t.deepEqual(
    pick("onlyHere", input),
    [1, undefined],
    "Array with extracted field not available in all source elements"
  )

  t.end()
})
