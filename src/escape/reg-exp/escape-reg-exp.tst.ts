import { describe, expect, test } from "tstyche"

import { escapeRegExp } from "./escape-reg-exp.js"

describe("escapeRegExp", () => {
  test("escapeRegExp - uncurried", () => {
    expect(escapeRegExp("foo.bar")).type.toBe<string>()
  })

  test("escapeRegExp - invalid input", () => {
    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type 'string'.
    escapeRegExp(42)
  })
})
