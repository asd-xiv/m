import test from "tape"

import { values } from "./values.js"

test("values", t => {
  t.deepEquals(
    values(["test", 1, 2]),
    ["test", 1, 2],
    "When passing an array, should return the same array"
  )

  t.deepEquals(
    values({ foo: "bar", lorem: "ipsum" }),
    ["bar", "ipsum"],
    "When passing an object, should return an array of strings with the values"
  )

  t.deepEquals(
    values("lorem"),
    [],
    "When passing a string, should return an empty array"
  )

  t.deepEquals(
    values(12),
    [],
    "when passing a number, should return an empty array"
  )

  t.end()
})
