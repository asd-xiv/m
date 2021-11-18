/* eslint-disable new-cap */

import test from "tape"

import { splitInGroupsOf } from "./split-in-groups-of.js"

test("splitInGroupsOf", t => {
  t.deepEqual(
    splitInGroupsOf(2)([1, 2, 3, 4]),
    [
      [1, 2],
      [3, 4],
    ],
    "given [array of size 4, split by size 2] should [return array with 2 sub-arrays, both of size 2]"
  )

  t.deepEqual(
    splitInGroupsOf(3, [1, 2, 3, 4]),
    [[1, 2, 3], [4]],
    "given [array of size 4, split by size 3] should [return array with 2 sub-arrays, one of size 3, other of size 1]"
  )

  t.deepEqual(
    splitInGroupsOf(4, [1, 2, 3, 4]),
    [[1, 2, 3, 4]],
    "given [array of size 4, split by size 4] should [return array with 1 sub-array, one of size 4]"
  )

  t.deepEqual(
    splitInGroupsOf(4, [1, 2, 3, 4]),
    [[1, 2, 3, 4]],
    "given [array of size 4, split by size 10] should [return array with 1 sub-array, one of size 4]"
  )

  t.deepEqual(
    splitInGroupsOf(4, [1, 2, 3, 4]),
    [[1, 2, 3, 4]],
    "given [array of size 4, split by size 10] should [return array with 1 sub-array, one of size 4]"
  )

  t.throws(
    () => splitInGroupsOf(0, [1, 2, 3, 4]),
    "Error: splitInGroupsOf - invalid 'size' parameter value '0'. 'size' value should be a positive, non-zero, integer.",
    "given [array of size 4, split by size 0] shold [throw]"
  )

  t.throws(
    () => splitInGroupsOf(2, 2),
    "TypeError: splitInGroupsOf - invalid 'source' parameter type 'number'. 'source' type should be Array.",
    "given [non-array source] shold [throw]"
  )

  t.end()
})
