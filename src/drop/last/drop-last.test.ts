import test from "tape"

import { dropLast } from "./drop-last.js"

test("dropLast - uncurried", t => {
  t.deepEqual(
    dropLast([1, 2, 3]),
    [1, 2],
    "given [an array] should [drop the last element by default]"
  )

  t.deepEqual(
    dropLast(2, [1, 2, 3]),
    [1],
    "given [count of 2 and a 3-element array, uncurried] should [return first element only]"
  )

  {
    const input = [1, 2, 3]

    t.notEqual(
      dropLast(1, input),
      input,
      "given [any call] should [return a new array (immutable)]"
    )
  }

  t.end()
})

test("dropLast - curried", t => {
  t.deepEqual(
    dropLast(2)([1, 2, 3]),
    [1],
    "given [count of 2 and a 3-element array, curried] should [return first element only]"
  )

  t.deepEqual(
    dropLast(3)([1, 2, 3]),
    [],
    "given [count equal to array length] should [return empty array]"
  )

  t.deepEqual(
    dropLast(5)([1, 2, 3]),
    [],
    "given [count greater than array length] should [return empty array]"
  )

  {
    const input = [1, 2, 3]

    t.notEqual(
      dropLast(1)(input),
      input,
      "given [any call] should [return a new array (immutable)]"
    )
  }

  t.end()
})

test("dropLast - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      dropLast("2", [1, 2, 3])
    },
    /expected 'count' to be 'Number', got 'String'/,
    "given [a string as count] should [throw TypeError]"
  )

  t.throws(
    () => dropLast(1.5, [1, 2, 3]),
    /expected 'count' to be 'NonNegativeInteger', got '1.5'/,
    "given [a fractional count] should [throw TypeError]"
  )

  t.throws(
    () => dropLast(-1, [1, 2, 3]),
    /expected 'count' to be 'NonNegativeInteger', got '-1'/,
    "given [a negative count] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      dropLast(1, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      dropLast(1)("not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input, curried] should [throw TypeError]"
  )

  t.end()
})
