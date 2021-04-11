import deepEquals from "fast-deep-equal"
import { describe } from "riteway"

import { distinct, distinctBy } from "./distinct"

describe("distinct", async assert => {
  assert({
    given: "empty array",
    should: "return empty array",
    actual: distinct([]),
    expected: [],
  })

  assert({
    given: "array with duplicate items of same type",
    should: "return array with unique items",
    actual: distinct([1, 1, 3]),
    expected: [1, 3],
  })

  assert({
    given: "array with unique items",
    should: "return array with same items",
    actual: distinct([1, "1", 3]),
    expected: [1, "1", 3],
  })
})

describe("distinctBy", async assert => {
  assert({
    given: "empty array",
    should: "return empty array",
    actual: distinctBy(deepEquals, [1, { a: 2 }, { a: 2 }]),
    expected: [1, { a: 2 }],
  })
})
