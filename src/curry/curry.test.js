import { describe } from "riteway"

import { curry } from "./curry"

const sum = (a, b) => a + b

describe("curry", async assert => {
  assert({
    given:
      "sum function, accepting two parameters, called with numeric values for both",
    should: "return the sum of passed values",
    actual: curry(sum)(2, 3),
    expected: 5,
  })

  assert({
    given:
      "sum function, accepting two parameters, called with numeric values in curried form",
    should: "return the sum of passed values",
    actual: curry(sum)(2)(3),
    expected: 5,
  })

  assert({
    given:
      "sum function, accepting two parameters, called with no parameters two times in curried form",
    should: "return NaN",
    actual: curry(sum)()(),
    expected: Number.NaN,
  })
})
