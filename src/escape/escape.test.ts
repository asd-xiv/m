import test from "tape"

import { escape } from "./escape.js"

test("escape - uncurried", t => {
  t.equal(
    escape(/\./g, "foo.bar"),
    "foo\\.bar",
    "given [a dot pattern and a string with dots] should [escape each dot]"
  )

  t.equal(
    escape("-", "a-b-c"),
    "a\\-b-c",
    "given [a string match] should [escape its first occurrence only]"
  )

  t.equal(
    escape(/\./g, "plain"),
    "plain",
    "given [a dot pattern and a string without dots] should [return the string unchanged]"
  )

  t.equal(
    escape(/\$/g, "price is $5"),
    "price is \\$5",
    "given [a dollar sign pattern] should [escape the dollar sign]"
  )

  t.end()
})

test("escape - curried", t => {
  {
    // A sticky regex keeps its lastIndex between calls. Each call must start
    // at the beginning, and leave the caller's regex as it was
    const sticky = /'/y
    const quote = escape(sticky)

    t.equal(
      quote("'a"),
      "\\'a",
      "given [a sticky regex] should [escape at the start]"
    )
    t.equal(
      quote("'b"),
      "\\'b",
      "given [a sticky regex, called again] should [escape at the start again]"
    )
    t.equal(
      sticky.lastIndex,
      0,
      "given [a sticky regex] should [leave its lastIndex alone]"
    )
  }

  t.equal(
    escape(/[*+]/g)("1+2*3"),
    "1\\+2\\*3",
    "given [a pattern matching + and * chars, curried] should [escape each match]"
  )

  t.end()
})

test("escape - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      escape(42, "foo")
    },
    /expected 'match' to be 'String' or 'RegExp', got 'Number'/,
    "given [a number as match] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      escape(/\./g, 42)
    },
    /expected 'input' to be 'String', got 'Number'/,
    "given [a number as input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      escape(/\./g)(42)
    },
    /expected 'input' to be 'String', got 'Number'/,
    "given [a number as input, curried] should [throw TypeError]"
  )

  t.end()
})
