import { describe, expect, test } from "tstyche"

import { trim } from "./trim.js"

describe("trim", () => {
  test("trim - uncurried", () => {
    expect(trim(" lorem ")).type.toBe<string>()
    expect(trim({ chars: "-" }, "-lorem-")).type.toBe<string>()
    expect(trim({}, " lorem ")).type.toBe<string>()
  })

  test("trim - curried", () => {
    const trimSlash = trim({ chars: "/" })

    expect(trimSlash).type.toBe<(text: string) => string>()
    expect(trimSlash("/usr/")).type.toBe<string>()
  })

  test("trim - invalid input", () => {
    expect(trim).type.not.toBeCallableWith(123)

    expect(trim).type.not.toBeCallableWith("-", "hello")

    expect(trim).type.not.toBeCallableWith({ chars: 1 }, "hello")

    expect(trim).type.not.toBeCallableWith({}, 123)
  })
})
