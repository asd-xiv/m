import test from "tape"

import { takeLast } from "./take-last.js"

test("takeLast - uncurried", t => {
  t.deepEqual(
    takeLast([1, 2, 3]),
    [3],
    "given [an array] should [take the last element by default]"
  )

  t.deepEqual(
    takeLast(2, [1, 2, 3]),
    [2, 3],
    "given [count of 2 and a 3-element array, uncurried] should [return the last two elements]"
  )

  t.deepEqual(
    takeLast(0, [1, 2, 3]),
    [],
    "given [count of 0] should [return empty array]"
  )

  {
    const input = [1, 2, 3]

    t.notEqual(
      takeLast(1, input),
      input,
      "given [any call] should [return a new array (immutable)]"
    )
  }

  t.end()
})

test("takeLast - curried", t => {
  t.deepEqual(
    takeLast(2)([1, 2, 3]),
    [2, 3],
    "given [count of 2 and a 3-element array, curried] should [return the last two elements]"
  )

  t.deepEqual(
    takeLast(3)([1, 2, 3]),
    [1, 2, 3],
    "given [count equal to array length] should [return a copy of the array]"
  )

  t.deepEqual(
    takeLast(5)([1, 2, 3]),
    [1, 2, 3],
    "given [count greater than array length] should [return a copy of the array]"
  )

  t.deepEqual(
    takeLast(0)([1, 2, 3]),
    [],
    "given [count of 0] should [return empty array]"
  )

  {
    const input = [1, 2, 3]

    t.notEqual(
      takeLast(1)(input),
      input,
      "given [any call] should [return a new array (immutable)]"
    )
  }

  t.end()
})

test("takeLast - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      takeLast("2", [1, 2, 3])
    },
    /expected 'count' to be 'Number', got 'String'/,
    "given [a string as count] should [throw TypeError]"
  )

  t.throws(
    () => takeLast(1.5, [1, 2, 3]),
    /expected 'count' to be 'NonNegativeInteger', got '1.5'/,
    "given [a fractional count] should [throw TypeError]"
  )

  t.throws(
    () => takeLast(-1, [1, 2, 3]),
    /expected 'count' to be 'NonNegativeInteger', got '-1'/,
    "given [a negative count] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      takeLast(1, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      takeLast(1)("not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input, curried] should [throw TypeError]"
  )

  t.end()
})
