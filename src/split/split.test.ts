import test from "tape"

import { split } from "./split.js"

test("split - uncurried", t => {
  t.deepEqual(
    split(",", "a,b,c"),
    ["a", "b", "c"],
    "given [comma separator and csv string] should [return array of parts]"
  )

  t.deepEqual(
    split(/[,-]/, "foo,bar-lorem"),
    ["foo", "bar", "lorem"],
    "given [regex separator matching comma and dash] should [split on both]"
  )

  t.deepEqual(
    split(",", ""),
    [""],
    "given [empty string] should [return array with empty string]"
  )

  t.end()
})

test("split - curried", t => {
  t.deepEqual(
    split(",")("lorem,ipsum"),
    ["lorem", "ipsum"],
    "given [comma separator, curried] should [return array of parts]"
  )

  t.end()
})

test("split - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      split(42, "a,b")
    },
    /expected 'separator' to be 'String' or 'RegExp', got 'Number'/,
    "given [a number as separator] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      split(",", 42)
    },
    /expected 'input' to be 'String', got 'Number'/,
    "given [a number as input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      split(",")(42)
    },
    /expected 'input' to be 'String', got 'Number'/,
    "given [a number as input, curried] should [throw TypeError]"
  )

  t.end()
})
