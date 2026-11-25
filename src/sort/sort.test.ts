import test from "tape"

import { sort } from "./sort.js"

test("sort - uncurried", t => {
  t.deepEqual(
    sort([3, 2, 1]),
    [1, 2, 3],
    "given [an array with unsorted numbers and no explicit direction] should [return an asc sorted array]"
  )

  t.deepEqual(
    sort("asc", [3, 1, 2]),
    [1, 2, 3],
    "given [an array with unsorted numbers and explicit asc direction] should [return an asc sorted array]"
  )

  t.deepEqual(
    sort("desc", [2, 4, 1]),
    [4, 2, 1],
    "given [an array with unsorted numbers and explicit desc direction] should [return a desc sorted array]"
  )

  t.deepEqual(
    sort([3, 3, 1, 2, 2]),
    [1, 2, 2, 3, 3],
    "given [an array with duplicate numbers] should [return a sorted array preserving duplicates]"
  )

  t.deepEqual(
    sort("desc", [3, 3, 1, 2, 2]),
    [3, 3, 2, 2, 1],
    "given [an array with duplicate numbers and desc direction] should [return a desc sorted array preserving duplicates]"
  )

  t.deepEqual(
    sort([true, false, true]),
    [false, true, true],
    "given [an array of booleans] should [sort ascending (false before true)]"
  )

  t.deepEqual(
    sort([3, Number.NaN, 1, 2]),
    [1, 2, 3, Number.NaN],
    "given [an array with NaN] should [sort NaN last]"
  )

  t.deepEqual(
    sort("desc", [3, Number.NaN, 1, 2]),
    [3, 2, 1, Number.NaN],
    "given [an array with NaN and desc direction] should [sort NaN last]"
  )

  t.deepEqual(
    sort([Number.NaN, Number.NaN, 1]),
    [1, Number.NaN, Number.NaN],
    "given [an array with many NaN] should [keep them after the numbers]"
  )

  {
    const input: readonly number[] = [3, 1, 2]

    t.deepEqual(
      sort(input),
      [1, 2, 3],
      "given [a readonly array] should [return a new sorted array]"
    )

    t.deepEqual(input, [3, 1, 2], "given [any call] should [not mutate input]")
  }

  t.end()
})

test("sort - curried", t => {
  t.deepEqual(
    sort("desc")(["a", "c", "b"]),
    ["c", "b", "a"],
    "given [an array with unsorted string] should [return an desc sorted array (curried)]"
  )

  t.end()
})

test("sort - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => sort(42),
    /expected 'direction' to be 'Array' or 'String', got 'Number'/,
    "given [a number] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => sort("up", [1, 2, 3]),
    /expected 'direction' to be 'asc' or 'desc', got 'up'/,
    "given [invalid direction string] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => sort("asc", "not-an-array"),
    /expected 'input' to be 'Array', got 'String'/,
    "given [valid direction but non-array input] should [throw TypeError]"
  )

  t.end()
})
