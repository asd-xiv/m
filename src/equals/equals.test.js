import test from "tape"
import { equals } from ".."

test("equals", t => {
  t.equals(equals(2)(2), true, "Compare two equal primitives")

  t.equals(equals("2")(2), false, "Compare two not-equal primitives")

  t.equals(equals(NaN)(NaN), true, "Compare two NaN values")

  t.equals(equals(null)(null), true, "Compare two null values")

  t.equals(equals(undefined)(undefined), true, "Compare two undefined values")

  t.equals(equals([1])([1]), false, "Compare two arrays with same content")

  t.equals(
    equals({ a: 1 })({ a: 1 }),
    false,
    "Compare two objects with same content"
  )

  t.end()
})
