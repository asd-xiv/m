import test from "tape"

import { intersect } from "./intersect.js"

test("intersect - uncurried", t => {
  t.deepEqual(
    intersect([1, 2, 3], [3, 2, 5]),
    [2, 3],
    "given [two arrays with overlap] should [return items in both, in order of the first]"
  )

  t.deepEqual(
    intersect([1, 1, 2, 2], [2, 1, 1]),
    [1, 2],
    "given [duplicates in both arrays] should [return distinct items]"
  )

  t.deepEqual(
    intersect([NaN, 1], [NaN, 2]),
    [NaN],
    "given [arrays with NaN] should [treat NaN as equal to NaN]"
  )

  t.deepEqual(
    intersect([1, 2], [3, 4]),
    [],
    "given [arrays without overlap] should [return empty array]"
  )

  t.deepEqual(
    intersect([], [1]),
    [],
    "given [empty first array] should [return empty array]"
  )

  t.deepEqual(
    intersect([1], []),
    [],
    "given [empty second array] should [return empty array]"
  )

  {
    const first: readonly number[] = [1, 2]
    const second: readonly number[] = [2, 3]

    t.deepEqual(
      intersect(first, second),
      [2],
      "given [readonly arrays] should [return the intersection]"
    )
  }

  t.end()
})

test("intersect - curried", t => {
  t.deepEqual(
    intersect([1, 1, 2])([2, 1]),
    [1, 2],
    "given [first array, curried] should [return the intersection]"
  )

  t.end()
})

test("intersect - invalid input", t => {
  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => intersect(42, [1]),
    /expected 'a' to be 'Array', got 'Number'/,
    "given [a number as first array] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => intersect([1], "abc"),
    /expected 'b' to be 'Array', got 'String'/,
    "given [a string as second array] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => intersect([1])(null),
    /expected 'b' to be 'Array', got 'Null'/,
    "given [null as second array, curried] should [throw TypeError]"
  )

  t.end()
})
