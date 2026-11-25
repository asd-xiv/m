import test from "tape"

import { take } from "./take.js"

test("take - uncurried", t => {
  t.deepEqual(
    take([1, 2, 3]),
    [1],
    "given [an array] should [take the first element by default]"
  )

  t.deepEqual(
    take(2, [1, 2, 3]),
    [1, 2],
    "given [count of 2 and a 3-element array, uncurried] should [return the first two elements]"
  )

  t.deepEqual(
    take(0, [1, 2, 3]),
    [],
    "given [count of 0] should [return empty array]"
  )

  {
    const input = [1, 2, 3]

    t.notEqual(
      take(1, input),
      input,
      "given [any call] should [return a new array (immutable)]"
    )
  }

  t.end()
})

test("take - curried", t => {
  t.deepEqual(
    take(2)([1, 2, 3]),
    [1, 2],
    "given [count of 2 and a 3-element array, curried] should [return the first two elements]"
  )

  t.deepEqual(
    take(3)([1, 2, 3]),
    [1, 2, 3],
    "given [count equal to array length] should [return a copy of the array]"
  )

  t.deepEqual(
    take(5)([1, 2, 3]),
    [1, 2, 3],
    "given [count greater than array length] should [return a copy of the array]"
  )

  t.deepEqual(
    take(0)([1, 2, 3]),
    [],
    "given [count of 0] should [return empty array]"
  )

  {
    const input = [1, 2, 3]

    t.notEqual(
      take(1)(input),
      input,
      "given [any call] should [return a new array (immutable)]"
    )
  }

  t.end()
})

test("take - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      take("2", [1, 2, 3])
    },
    /expected 'count' to be 'Number', got 'String'/,
    "given [a string as count] should [throw TypeError]"
  )

  t.throws(
    () => take(1.5, [1, 2, 3]),
    /expected 'count' to be 'NonNegativeInteger', got '1.5'/,
    "given [a fractional count] should [throw TypeError]"
  )

  t.throws(
    () => take(-1, [1, 2, 3]),
    /expected 'count' to be 'NonNegativeInteger', got '-1'/,
    "given [a negative count] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      take(1, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      take(1)("not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input, curried] should [throw TypeError]"
  )

  t.end()
})
