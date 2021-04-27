import { describe } from "riteway"

import { unite } from "./unite"

describe("unite", async assert => {
  assert({
    given: "a comma and and array",
    should: "return a string with items separated by comma",
    actual: unite(",", [1, 2, 3]),
    expected: "1,2,3",
  })
})
