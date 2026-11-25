import test from "tape"

import { unite } from "./unite.js"

test("unite - uncurried", t => {
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

  t.end()
})

test("unite - curried", t => {
  t.deepEqual(
    unite([1, 1, 2])([2, 3]),
    [1, 2, 3],
    "given [arrays with internal duplicates, curried] should [deduplicate all]"
  )

  t.end()
})

test("unite - invalid input", t => {
  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => unite(42, [1]),
    /expected 'a' to be 'Array', got 'Number'/,
    "given [a number as first array] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => unite([1], "abc"),
    /expected 'b' to be 'Array', got 'String'/,
    "given [a string as second array] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => unite([1])(null),
    /expected 'b' to be 'Array', got 'Null'/,
    "given [null as second array, curried] should [throw TypeError]"
  )

  t.end()
})
