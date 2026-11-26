import test from "tape"

import { difference, symmetricDifference } from "./difference"

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

test("symmetricDifference", t => {
  t.deepEqual(
    symmetricDifference([], [1, 2, 3]),
    [1, 2, 3],
    "First array empty"
  )

  t.deepEqual(
    symmetricDifference([1, 2, 3], []),
    [1, 2, 3],
    "Second array empty"
  )

  t.deepEqual(
    symmetricDifference([1, 2, 3], [3, 4, 5]),
    [1, 2, 4, 5],
    "symmetricDifference with common"
  )

  t.deepEqual(
    symmetricDifference([1, 2], [3, 4, 5]),
    [1, 2, 3, 4, 5],
    "symmetricDifference without common"
  )

  t.deepEqual(
    symmetricDifference(
      [
        { a: 1, b: 2 },
        { c: 3, d: 4 },
      ],
      [{ a: 1, c: 3, d: 4 }, { a: 1 }, { c: 3 }, { a: 1, b: 2 }]
    ),
    [{ c: 3, d: 4 }, { a: 1, c: 3, d: 4 }, { a: 1 }, { c: 3 }],
    "symmetricDifference with one common"
  )

  t.end()
})
