import test from "tape"

import { join } from "./join.js"

test("join - uncurried", t => {
  t.equal(
    join(",", ["a", "b", "c"]),
    "a,b,c",
    "given [comma separator and array of strings] should [return joined string]"
  )

  t.equal(join(",", []), "", "given [empty array] should [return empty string]")

  t.equal(
    join("", ["a", "b", "c"]),
    "abc",
    "given [empty separator] should [concatenate without separator]"
  )

  t.end()
})

test("join - curried", t => {
  t.equal(
    join("-")(["foo", "bar"]),
    "foo-bar",
    "given [dash separator, curried] should [return joined string]"
  )

  t.end()
})

test("join - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      join(42, ["a", "b"])
    },
    /expected 'separator' to be 'String', got 'Number'/,
    "given [a number as separator] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      join(",", "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      join(",")("not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input, curried] should [throw TypeError]"
  )

  t.end()
})
