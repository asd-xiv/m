import { describe, expect, test } from "tstyche"

import { escapeRegExp } from "./escape-reg-exp.js"

describe("escapeRegExp", () => {
  test("escapeRegExp - uncurried", () => {
    expect(escapeRegExp("foo.bar")).type.toBe<string>()
  })

  test("escapeRegExp - invalid input", () => {
    expect(escapeRegExp).type.not.toBeCallableWith(42)
  })
})
