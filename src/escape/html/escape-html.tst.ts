import { describe, expect, test } from "tstyche"

import { escapeHTML } from "./escape-html.js"

describe("escapeHTML", () => {
  test("escapeHTML - uncurried", () => {
    expect(escapeHTML("<div>")).type.toBe<string>()
  })

  test("escapeHTML - invalid input", () => {
    expect(escapeHTML).type.not.toBeCallableWith(42)
  })
})
