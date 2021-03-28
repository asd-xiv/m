import test from "tape"

import { difference, symetricDifference } from "./difference"

test("difference", t => {
  t.deepEqual(difference([], [1, 2, 3]), [], "First array empty")

  t.deepEqual(difference([1, 2, 3], []), [1, 2, 3], "Second array empty")

  t.deepEqual(
    difference([1, 2, 3], [3, 4, 5]),
    [1, 2],
    "Difference with common"
  )

  t.deepEqual(
    difference([1, 2], [3, 4, 5]),
    [1, 2],
    "Difference without common"
  )

  t.deepEqual(
    difference(
      [
        { a: 1, b: 2 },
        { c: 3, d: 4 },
      ],
      [{ a: 1, c: 3, d: 4 }, { a: 1 }, { c: 3 }, { a: 1, b: 2 }]
    ),
    [{ c: 3, d: 4 }],
    "Difference with one common"
  )

  t.end()
})

test("symetricDifference", t => {
  t.deepEqual(symetricDifference([], [1, 2, 3]), [1, 2, 3], "First array empty")

  t.deepEqual(
    symetricDifference([1, 2, 3], []),
    [1, 2, 3],
    "Second array empty"
  )

  t.deepEqual(
    symetricDifference([1, 2, 3], [3, 4, 5]),
    [1, 2, 4, 5],
    "SymetricDifference with common"
  )

  t.deepEqual(
    symetricDifference([1, 2], [3, 4, 5]),
    [1, 2, 3, 4, 5],
    "SymetricDifference without common"
  )

  t.deepEqual(
    symetricDifference(
      [
        { a: 1, b: 2 },
        { c: 3, d: 4 },
      ],
      [{ a: 1, c: 3, d: 4 }, { a: 1 }, { c: 3 }, { a: 1, b: 2 }]
    ),
    [{ c: 3, d: 4 }, { a: 1, c: 3, d: 4 }, { a: 1 }, { c: 3 }],
    "SymetricDifference with one common"
  )

  t.end()
})
