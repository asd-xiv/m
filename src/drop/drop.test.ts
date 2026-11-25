import test from "tape"

import { drop } from "./drop.js"

test("drop - uncurried", t => {
  t.deepEqual(
    drop([1, 2, 3]),
    [2, 3],
    "given [an array] should [drop the first element by default]"
  )

  t.deepEqual(
    drop(2, [1, 2, 3]),
    [3],
    "given [count of 2 and a 3-element array, uncurried] should [return the last element only]"
  )

  {
    const input = [1, 2, 3]

    t.notEqual(
      drop(1, input),
      input,
      "given [any call] should [return a new array (immutable)]"
    )
  }

  t.end()
})

test("drop - curried", t => {
  t.deepEqual(
    drop(2)([1, 2, 3]),
    [3],
    "given [count of 2 and a 3-element array, curried] should [return the last element only]"
  )

  t.deepEqual(
    drop(3)([1, 2, 3]),
    [],
    "given [count equal to array length] should [return empty array]"
  )

  t.deepEqual(
    drop(5)([1, 2, 3]),
    [],
    "given [count greater than array length] should [return empty array]"
  )

  t.deepEqual(
    drop(0)([1, 2, 3]),
    [1, 2, 3],
    "given [count of 0] should [return a copy of the array]"
  )

  {
    const input = [1, 2, 3]

    t.notEqual(
      drop(1)(input),
      input,
      "given [any call] should [return a new array (immutable)]"
    )
  }

  t.end()
})

test("drop - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      drop("2", [1, 2, 3])
    },
    /expected 'count' to be 'Number', got 'String'/,
    "given [a string as count] should [throw TypeError]"
  )

  t.throws(
    () => drop(1.5, [1, 2, 3]),
    /expected 'count' to be 'NonNegativeInteger', got '1.5'/,
    "given [a fractional count] should [throw TypeError]"
  )

  t.throws(
    () => drop(-1, [1, 2, 3]),
    /expected 'count' to be 'NonNegativeInteger', got '-1'/,
    "given [a negative count] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      drop(1, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      drop(1)("not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input, curried] should [throw TypeError]"
  )

  t.end()
})
