import test from "tape"

import { intersection } from "./intersection"

test("intersection", t => {
  t.deepEqual(intersection([], [1, 2, 3]), [], "First array empty")

  t.deepEqual(intersection([1, 2, 3], []), [], "Second array empty")

  t.deepEqual(
    intersection([1, 2, 3], [3, 4, 5]),
    [3],
    "Intersection with common"
  )

  t.deepEqual(
    intersection([1, 2], [3, 4, 5]),
    [],
    "Intersection without common"
  )

  t.deepEqual(
    intersection(
      [
        { a: 1, b: 2 },
        { c: 3, d: 4 },
      ],
      [{ a: 1, c: 3, d: 4 }, { a: 1 }, { c: 3 }, { a: 1, b: 2 }]
    ),
    [{ a: 1, b: 2 }],
    "Intersection with one common"
  )

  t.end()
})
