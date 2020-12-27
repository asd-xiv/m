/* eslint-disable new-cap */

import { describe, Try } from "riteway"
import { splitInGroupsOf } from "./split-in-groups-of"

describe("splitInGroupsOf", async assert => {
  assert({
    given: "array of size 4, split by size 2",
    should: "return array with 2 sub-arrays, both of size 2",
    actual: splitInGroupsOf(2)([1, 2, 3, 4]),
    expected: [
      [1, 2],
      [3, 4],
    ],
  })

  assert({
    given: "array of size 4, split by size 3",
    should: "return array with 2 sub-arrays, one of size 3, other of size 1",
    actual: splitInGroupsOf(3, [1, 2, 3, 4]),
    expected: [[1, 2, 3], [4]],
  })

  assert({
    given: "array of size 4, split by size 4",
    should: "return array with 1 sub-array, one of size 4",
    actual: splitInGroupsOf(4, [1, 2, 3, 4]),
    expected: [[1, 2, 3, 4]],
  })

  assert({
    given: "array of size 4, split by size 10",
    should: "return array with 1 sub-array, one of size 4",
    actual: splitInGroupsOf(4, [1, 2, 3, 4]),
    expected: [[1, 2, 3, 4]],
  })

  assert({
    given: "array of size 4, split by size 10",
    should: "return array with 1 sub-array, one of size 4",
    actual: splitInGroupsOf(4, [1, 2, 3, 4]),
    expected: [[1, 2, 3, 4]],
  })

  assert({
    given: "array of size 4, split by size 0",
    should: "throw",
    actual: Try(() => {
      splitInGroupsOf(0, [1, 2, 3, 4])
    }).toString(),
    expected:
      "Error: splitInGroupsOf - invalid 'size' parameter value '0'. 'size' value should be a positive, non-zero, integer.",
  })

  assert({
    given: "non-array source",
    should: "throw",
    actual: Try(() => {
      splitInGroupsOf(2, 2)
    }).toString(),
    expected:
      "TypeError: splitInGroupsOf - invalid 'source' parameter type 'number'. 'source' type should be Array.",
  })
})
