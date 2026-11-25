import { describe, expect, test } from "tstyche"

import { toString } from "./to-string.js"

describe("toString", () => {
  test("toString - valid input", () => {
    expect(toString(42)).type.toBe<string>()
    expect(toString("hello")).type.toBe<string>()
    expect(toString(null)).type.toBe<string>()
    expect(toString(undefined)).type.toBe<string>()
    expect(toString(true)).type.toBe<string>()
    expect(toString({ id: 1 })).type.toBe<string>()
  })
})
