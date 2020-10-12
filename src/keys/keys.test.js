import test from "tape"

import { keys } from "./keys"

test("keys", t => {
  t.deepEquals(
    keys(["test", 1, 2]),
    ["0", "1", "2"],
    "When passing an array, should return an array of string with the index of each element"
  )

  t.deepEquals(
    keys({ foo: "bar", lorem: "ipsum" }),
    ["foo", "lorem"],
    "When passing an object, should return an array of strings with the key values"
  )

  t.deepEquals(
    keys("lorem"),
    [],
    "When passing a string, should return an empty array"
  )

  t.deepEquals(
    keys(12),
    [],
    "when passing a number, should return an empty array"
  )

  t.end()
})
