import { describe } from "riteway"

import { overlap, overlapBy } from "./overlap"

describe("overlap", async assert => {
  assert({
    given: "empty first array",
    should: "return contents of second array",
    actual: overlap([], [1, 2, 3]),
    expected: [1, 2, 3],
  })

  assert({
    given: "empty second array",
    should: "return contents of first array",
    actual: overlap([1, 2, 3], []),
    expected: [1, 2, 3],
  })

  assert({
    given: "two non empty arrays with common items",
    should: "return distinct items of both arrays",
    actual: overlap([1, 1, 2, 3, 3], [3, 3, 4, 4, 5]),
    expected: [1, 2, 3, 4, 5],
  })

  assert({
    given: "two non empty arrays without common items",
    should: "return array with items from both arrays",
    actual: overlap([1, 2], [3, 4, 5]),
    expected: [1, 2, 3, 4, 5],
  })
})

describe("overlapBy", async assert => {
  assert({
    given: "two non empty object arrays with common items",
    should:
      "return array with items from both arrays, with merged values for overlaping ones",
    actual: overlapBy(
      (a, b) => a.id === b.id,
      (a, b) => ({ ...a, ...b }),
      [{ id: 1, overwrite: 1 }, { id: 2 }, { id: 2 }],
      [{ id: 1, overwrite: 2, foo: "bar" }, { id: 3 }]
    ),
    expected: [{ id: 1, overwrite: 2, foo: "bar" }, { id: 2 }, { id: 3 }],
  })
})
