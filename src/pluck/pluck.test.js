import test from "tape"

import { pluck } from "./pluck"

test("pluck", t => {
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

  t.deepEqual(pluck("position")(source), [3, -1], "Array with extracted field")

  t.deepEqual(
    pluck("onlyHere", source),
    [1, undefined],
    "Array with extracted field not available in all source elements"
  )

  t.end()
})
