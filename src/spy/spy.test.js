/* eslint-disable  new-cap */

import { describe, Try } from "riteway"

import { pipe } from "../pipe/pipe"
import { spy } from "./spy"

describe("spy", async assert => {
  assert({
    given: "unary pipe",
    should: "return initial souce value",
    actual: pipe(spy("test"), source => source)(2),
    expected: 2,
  })

  assert({
    given: "multiple parameters when calling pipe",
    should: "throw since we cant proxy multiple values",
    actual: Try(
      pipe(spy("test"), source => source),
      2,
      3
    ).toString(),
    expected: "Error: m:spy - Can only be called with 1 parameter, received 2",
  })
})
