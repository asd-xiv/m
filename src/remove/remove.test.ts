import test from "tape"

import { remove } from "./remove.js"

test("remove - uncurried", t => {
  t.deepEqual(
    remove(3, [1, 2, 3, 4, 3]),
    [1, 2, 4],
    "given [a value present multiple times] should [remove all occurrences]"
  )

  t.deepEqual(
    remove(5, [1, 2, 3]),
    [1, 2, 3],
    "given [a value not in the array] should [return the same elements]"
  )

  t.deepEqual(
    remove(1, [] as number[]),
    [],
    "given [an empty array] should [return an empty array]"
  )

  t.deepEqual(
    remove("b", ["a", "b", "c", "b"]),
    ["a", "c"],
    "given [a string value] should [remove all matching strings]"
  )

  const input = [1, 2, 3]
  const result = remove(2, input)

  t.notEqual(
    result,
    input,
    "given [an array] should [return a new array instance]"
  )

  t.deepEqual(
    input,
    [1, 2, 3],
    "given [an array] should [not mutate the original]"
  )

  t.end()
})

test("remove - NaN", t => {
  t.deepEqual(
    remove(Number.NaN, [Number.NaN, 1, Number.NaN]),
    [1],
    "given [NaN as value] should [remove every NaN, SameValueZero]"
  )

  t.deepEqual(remove(0, [-0, 0, 1]), [1], "given [0] should [remove -0 too]")

  t.end()
})

test("remove - curried", t => {
  t.deepEqual(
    remove(3)([1, 2, 3, 4, 3]),
    [1, 2, 4],
    "given [a value present multiple times] should [remove all occurrences]"
  )

  t.deepEqual(
    remove("x")(["x", "y", "x"]),
    ["y"],
    "given [a string value, curried] should [remove all matching strings]"
  )

  t.end()
})

test("remove - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      remove(1, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [non-array input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      remove(1)(42)
    },
    /expected 'input' to be 'Array', got 'Number'/,
    "given [non-array input, curried] should [throw TypeError]"
  )

  t.end()
})
