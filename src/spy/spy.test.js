/* eslint-disable  new-cap */

import { describe, Try } from "riteway"

import { pipe } from "../pipe/pipe"
import { top } from "../top/top"
import { spy } from "./spy"

const example = [{ id: 1 }, { id: 2 }, { id: "uuid" }]

describe("spy", async assert => {
  assert({
    given: "no arguments pipe",
    should: "return initial source value",
    actual: pipe(spy(), source => source)(2),
    expected: 2,
  })

  assert({
    given: "unary pipe",
    should: "return initial source value",
    actual: pipe(spy("test"), source => source)(2),
    expected: 2,
  })

  assert({
    given: "slicing and transformations",
    should: "return initial source value",
    actual: pipe(
      spy({
        description: "First 2 items",
        transform: top(2),
      }),
      source => source
    )(example),
    expected: example,
  })

  assert({
    given: "multiple parameters when calling pipe",
    should: "throw since we cant proxy multiple values",
    actual: Try(
      pipe(spy("test"), source => source),
      2,
      3
    ).toString(),
    expected:
      "Error: @asd14/m/spy - Can only be called with 1 parameter, received 2",
  })
})
