import test from "tape"

import { pick } from "./pick"

test("pick", t => {
  const source = [
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

  t.deepEqual(pick("position")(source), [3, -1], "Array with extracted field")

  t.deepEqual(
    pick("onlyHere", source),
    [1, undefined],
    "Array with extracted field not available in all source elements"
  )

  t.end()
})
