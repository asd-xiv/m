/* eslint-disable new-cap */

import test from "tape"

import { split } from "./split.js"

test("split", t => {
  t.deepEqual(
    split(",")("lorem,ipsum"),
    ["lorem", "ipsum"],
    "given [string that contains one ',', splitting by it] should [return array with 2 strings]"
  )

  t.deepEqual(
    split(/[,-]/, "foo,bar-lorem"),
    ["foo", "bar", "lorem"],
    "given [string that contains one ',' and one '-', splitting by a RegExp matching both] should [return array with 3 strings]"
  )

  t.throws(
    () => split(",", [1, 2, 3, 4]),
    "TypeError: split - invalid 'source' parameter type 'object'. 'source' type should be String.",
    "given [non-string source] shold [throw]"
  )

  t.throws(
    () => split(2, [1, 2, 3, 4]),
    "TypeError: split - invalid 'separator' parameter type 'number'. 'separator' type should be a String or RegExp.",
    "given [non-string, non-regexp separator] shold [throw]"
  )

  t.end()
})
