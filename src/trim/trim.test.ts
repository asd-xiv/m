import test from "tape"

import { trim } from "./trim.js"
import { map } from "../map/map.js"
import { pipe } from "../pipe/pipe.js"

test("trim - uncurried", t => {
  t.equal(
    trim("\n lorem \t"),
    "lorem",
    "given [a string with whitespace around] should [remove the whitespace]"
  )

  t.equal(
    trim({ chars: "\t" }, "\t lorem \t"),
    " lorem ",
    "given [a tab as chars] should [remove only the tabs]"
  )

  t.equal(
    trim({ chars: "-_" }, "_-lorem-_-"),
    "lorem",
    "given [chars with two characters] should [treat chars as a set]"
  )

  t.equal(
    trim({ chars: ".]^\\" }, ".]hello^\\"),
    "hello",
    "given [chars that are regex special] should [remove them literally]"
  )

  t.equal(
    trim({ chars: "😀" }, "😀😀a😀"),
    "a",
    "given [an emoji as chars] should [remove it whole]"
  )

  t.equal(
    trim({}, " a "),
    "a",
    "given [options without chars] should [remove the whitespace]"
  )

  t.equal(
    trim({ chars: "" }, " a "),
    " a ",
    "given [empty chars] should [keep the text]"
  )

  t.equal(
    trim({ chars: "x" }, "xxx"),
    "",
    "given [a text of only chars] should [return an empty string]"
  )

  t.end()
})

const pickPath = (input: { path: string }) => input.path

test("trim - curried", t => {
  t.deepEqual(
    map(trim, ["  a  ", " b"]),
    ["a", "b"],
    "given [trim as a map step] should [trim each string]"
  )

  t.equal(
    trim({ chars: "/" })("/usr/local/"),
    "usr/local",
    "given [chars and a text, curried] should [remove the slashes]"
  )

  t.equal(
    pipe(pickPath, trim({ chars: "/" }))({ path: "/usr/local/" }),
    "usr/local",
    "given [trim step in a pipe] should [remove the slashes]"
  )

  t.end()
})

test("trim - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      trim(42)
    },
    /expected 'input' to be 'String' or 'Object', got 'Number'/,
    "given [a number as only argument] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      trim()
    },
    /expected 'input' to be 'String' or 'Object', got 'Undefined'/,
    "given [no argument] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      trim("-", "-a-")
    },
    /expected 'options' to be 'Object', got 'String'/,
    "given [a string as options] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      trim({ chars: 42 }, "a")
    },
    /expected 'options.chars' to be 'String', got 'Number'/,
    "given [a number as chars] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      trim({ chars: 42 })
    },
    /expected 'options.chars' to be 'String', got 'Number'/,
    "given [a number as chars, curried] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      trim({}, 42)
    },
    /expected 'text' to be 'String', got 'Number'/,
    "given [a number as text] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      trim({})(42)
    },
    /expected 'text' to be 'String', got 'Number'/,
    "given [a number as text, curried] should [throw TypeError]"
  )

  t.end()
})
