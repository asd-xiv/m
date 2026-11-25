import test from "tape"

import { splitInGroupsOf } from "./split-in-groups-of.js"

test("splitInGroupsOf - uncurried", t => {
  t.deepEqual(
    splitInGroupsOf(2, [1, 2, 3, 4]),
    [
      [1, 2],
      [3, 4],
    ],
    "given [size 2, 4-element array] should [return 2 groups of 2]"
  )

  t.deepEqual(
    splitInGroupsOf(3, [1, 2, 3, 4]),
    [[1, 2, 3], [4]],
    "given [size 3, 4-element array] should [return group of 3 and group of 1]"
  )

  t.deepEqual(
    splitInGroupsOf(4, [1, 2, 3, 4]),
    [[1, 2, 3, 4]],
    "given [size equal to array length] should [return single group]"
  )

  t.deepEqual(
    splitInGroupsOf(10, [1, 2, 3]),
    [[1, 2, 3]],
    "given [size larger than array length] should [return single group with all elements]"
  )

  t.deepEqual(
    splitInGroupsOf(2, []),
    [],
    "given [empty array] should [return empty array]"
  )

  {
    const input: readonly number[] = [1, 2, 3]
    const output = splitInGroupsOf(2, input)

    t.deepEqual(
      [output, input],
      [
        [[1, 2], [3]],
        [1, 2, 3],
      ],
      "given [a readonly array] should [return new groups and leave the input alone]"
    )
  }

  t.end()
})

test("splitInGroupsOf - curried", t => {
  t.deepEqual(
    splitInGroupsOf(2)([1, 2, 3, 4]),
    [
      [1, 2],
      [3, 4],
    ],
    "given [size 2, curried, 4-element array] should [return 2 groups of 2]"
  )

  t.deepEqual(
    splitInGroupsOf(3)([1, 2, 3, 4]),
    [[1, 2, 3], [4]],
    "given [size 3, curried, 4-element array] should [return group of 3 and group of 1]"
  )

  t.end()
})

test("splitInGroupsOf - invalid input", t => {
  t.throws(
    () => splitInGroupsOf(0, [1, 2, 3]),
    /expected 'size' to be 'PositiveInteger', got '0'/,
    "given [size 0] should [throw TypeError]"
  )

  t.throws(
    () => splitInGroupsOf(-1, [1, 2]),
    /expected 'size' to be 'PositiveInteger', got '-1'/,
    "given [negative size] should [throw TypeError]"
  )

  t.throws(
    () => splitInGroupsOf(1.5, [1, 2]),
    /expected 'size' to be 'PositiveInteger', got '1\.5'/,
    "given [non-integer size] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      splitInGroupsOf("2", [1, 2])
    },
    /expected 'size' to be 'PositiveInteger', got '"2"'/,
    "given [a string as size] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      splitInGroupsOf(2, "not-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [non-array input] should [throw TypeError]"
  )

  t.end()
})
