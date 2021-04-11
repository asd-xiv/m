import { describe } from "riteway"

import { intersect, intersectBy } from "./intersect"

describe("intersect", async assert => {
  assert({
    given: "empty first array",
    should: "return an empty array",
    actual: intersect([], [1, 2, 3]),
    expected: [],
  })

  assert({
    given: "empty second array",
    should: "return an empty array",
    actual: intersect([1, 2, 3], []),
    expected: [],
  })

  assert({
    given: "two arrays with common items",
    should: "return an array containing those items",
    actual: intersect([1, 2, 3, 3, 4], [3, 3, 4, 5]),
    expected: [3, 4],
  })

  assert({
    given: "two non empty arrays without common items",
    should: "return an empty array",
    actual: intersect([1, 2, 2], [3, 3, 4, 5]),
    expected: [],
  })
})

describe("intersectBy", async assert => {
  assert({
    given: "two non empty arrays common object items",
    should: "return an array containing those objects",
    actual: intersectBy(
      (a, b) => a.id === b.id,
      (a, b) => ({ ...a, ...b }),
      [
        { id: 1, lorem: "ipsum" },
        { id: 2, foo: "bar1" },
        { id: 2, foo: "bar2" },
      ],
      [
        { id: 2, comments: [] },
        { id: 3, comments: [] },
      ]
    ),
    expected: [{ id: 2, foo: "bar1", comments: [] }],
  })
})
