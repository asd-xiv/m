import test from "tape"

import { unite } from "../unite.js"

test("unite - valid", t => {
  t.deepEqual(
    unite([1, 2, 3], [2, 3, 4, 5]),
    [1, 2, 3, 4, 5],
    "given [two arrays with overlap] should [return unique union]"
  )

  t.deepEqual(
    unite([], [1, 2, 3]),
    [1, 2, 3],
    "given [empty first array] should [return distinct items from second]"
  )

  t.deepEqual(
    unite([1, 2, 3], []),
    [1, 2, 3],
    "given [empty second array] should [return distinct items from first]"
  )

  t.deepEqual(
    unite([], []),
    [],
    "given [two empty arrays] should [return empty array]"
  )

  t.deepEqual(
    unite([NaN, 1], [NaN, 2]),
    [NaN, 1, 2],
    "given [arrays with NaN] should [treat NaN as equal to NaN]"
  )

  t.deepEqual(
    unite([1, 2], [2, 1, 3]),
    [1, 2, 3],
    "given [overlapping arrays] should [keep items of the first array first]"
  )

  {
    const first: readonly number[] = [1, 2]
    const second: readonly number[] = [2, 3]

    t.deepEqual(
      unite(first, second),
      [1, 2, 3],
      "given [readonly arrays] should [return unique union]"
    )
  }

  {
    const a = Array.from({ length: 25_000 }, (_, index) => index)
    const b = Array.from({ length: 25_000 }, (_, index) => index + 12_500)

    t.equal(
      unite(a, b).length,
      37_500,
      "given [two arrays of 25,000 that overlap by half] should [return 37,500, in one pass]"
    )
  }

  // Curried
  t.deepEqual(
    unite([1, 1, 2])([2, 3]),
    [1, 2, 3],
    "given [arrays with internal duplicates, curried] should [deduplicate all]"
  )

  t.end()
})
