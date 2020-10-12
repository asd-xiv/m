import test from "tape"

import { isEqual } from "./is-equal"

test("isEqual", t => {
  t.equals(isEqual(2)(2), true, "Compare two equal primitives")

  t.equals(isEqual("2")(2), false, "Compare two not-equal primitives")

  t.equals(isEqual(NaN)(NaN), true, "Compare two NaN values")

  t.equals(isEqual(null)(null), true, "Compare two null values")

  t.equals(isEqual(undefined)(undefined), true, "Compare two undefined values")

  t.equals(isEqual([1])([1]), false, "Compare two arrays with same content")

  t.equals(
    isEqual({ a: 1 })({ a: 1 }),
    false,
    "Compare two objects with same content"
  )

  t.end()
})
