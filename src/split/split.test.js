/* eslint-disable new-cap */

import { describe, Try } from "riteway"
import { split } from "./split"

describe("split", async assert => {
  assert({
    given: "string that contains one ',', splitting by it",
    should: "return array with 2 strings",
    actual: split(",")("lorem,ipsum"),
    expected: ["lorem", "ipsum"],
  })

  assert({
    given:
      "string that contains one ',' and one '-', splitting by a RegExp matching both",
    should: "return array with 3 strings",
    actual: split(/[,-]/, "foo,bar-lorem"),
    expected: ["foo", "bar", "lorem"],
  })

  assert({
    given: "non-string source",
    should: "throw",
    actual: Try(() => {
      split(",", [1, 2, 3, 4])
    }).toString(),
    expected:
      "TypeError: split - invalid 'source' parameter type 'object'. 'source' type should be String.",
  })

  assert({
    given: "non-string, non-regexp separator",
    should: "throw",
    actual: Try(() => {
      split(2, [1, 2, 3, 4])
    }).toString(),
    expected: `TypeError: split - invalid 'separator' parameter type 'number'. 'separator' type should be a String or RegExp.`,
  })
})
