import { describe, expect, test } from "tstyche"

import { escapeHTML } from "./escape-html.js"

describe("escapeHTML", () => {
  test("escapeHTML - uncurried", () => {
    expect(escapeHTML("<div>")).type.toBe<string>()
  })

  test("escapeHTML - invalid input", () => {
    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type 'string'.
    escapeHTML(42)
  })
})
