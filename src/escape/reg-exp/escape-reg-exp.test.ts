import test from "tape"

import { escapeRegExp } from "./escape-reg-exp.js"

test("escapeRegExp - uncurried", t => {
  t.equal(
    escapeRegExp("lorem. ipsum [dolor] (sit amet)?"),
    "lorem\\. ipsum \\[dolor\\] \\(sit amet\\)\\?",
    "given [string with (, ), [, ], ?, . chars] should [escape each special char]"
  )

  t.equal(
    escapeRegExp("Alice + Bob = $orry | A < B | f* => {}"),
    "Alice \\+ Bob \\x3d \\$orry \\| A \\x3c B \\| f\\* \\x3d\\x3e \\{\\}",
    "given [string with +, $, |, *, {, } and =, <, > chars] should [escape each, the v flag's reserved ones as \\xNN]"
  )

  t.equal(
    escapeRegExp("a-z"),
    "a\\x2dz",
    "given [a string with a dash] should [escape - as \\x2d]"
  )

  // The input classes of Test262's RegExp.escape tests. Each must match itself
  // with no flag, the u flag and the v flag, inside a character class and
  // outside. With the v flag, a doubled & or ! is an operator inside a class,
  // and an escaped dash outside one used to throw "Invalid escape"
  {
    const punctuation: string[] = []

    for (let code = 0x21; code <= 0x7e; code++) {
      const char = String.fromCharCode(code)

      if (!/[\dA-Za-z]/.test(char)) {
        punctuation.push(char, `${char}${char}`, `a${char}${char}b`)
      }
    }

    const texts = [
      ...punctuation,
      "a\tb\nc\rd",
      "a\u00A0b\uFEFFc",
      "a\u2028b\u2029c",
      "a\uD83Db",
      "안녕 Γειά",
      "😀",
    ]
    const failures: string[] = []

    for (const text of texts) {
      for (const flags of ["", "u", "v"]) {
        const escaped = escapeRegExp(text)
        const outside = new RegExp(`^${escaped}$`, flags)
        const inside = new RegExp(`^[${escaped}]+$`, flags)

        if (!outside.test(text) || !inside.test(text) || inside.test("z")) {
          failures.push(`${JSON.stringify(text)} with flags "${flags}"`)
        }
      }
    }

    t.deepEqual(
      failures,
      [],
      "given [punctuation alone or doubled, whitespace, line terminators, a lone surrogate or non-ASCII text, in any mode] should [match itself inside and outside a character class]"
    )
  }

  t.equal(
    escapeRegExp(""),
    "",
    "given [an empty string] should [return an empty string]"
  )

  t.true(
    new RegExp(`^[${escapeRegExp("a-z")}]+$`, "u").test("a-z") &&
      !new RegExp(`^[${escapeRegExp("a-z")}]$`, "u").test("b"),
    "given [an escaped string in a character class with the u flag] should [match its characters only, not a range]"
  )

  t.true(
    new RegExp(escapeRegExp("a<b>"), "u").test("a<b>"),
    "given [a string with < and > and the u flag] should [build a valid RegExp]"
  )

  t.equal(
    escapeRegExp("a^b"),
    "a\\^b",
    "given [string with caret] should [escape ^]"
  )

  t.equal(
    escapeRegExp("back\\slash"),
    "back\\\\slash",
    "given [string with backslash] should [escape \\]"
  )

  t.equal(
    escapeRegExp("plain text"),
    "plain text",
    "given [string without special chars] should [return the string unchanged]"
  )

  t.end()
})

test("escapeRegExp - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      escapeRegExp(42)
    },
    /expected 'input' to be 'String', got 'Number'/,
    "given [a number as input] should [throw TypeError]"
  )

  t.end()
})
