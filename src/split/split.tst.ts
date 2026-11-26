import { describe, expect, test } from "tstyche"

import { split } from "./split.js"

describe("split", () => {
  test("split - uncurried", () => {
    expect(split(",", "a,b,c")).type.toBe<string[]>()

    expect(split(/[,-]/, "foo,bar-baz")).type.toBe<string[]>()
  })

  test("split - curried", () => {
    const splitOnComma = split(",")

    expect(splitOnComma).type.toBe<(input: string) => string[]>()
    expect(splitOnComma("a,b")).type.toBe<string[]>()
  })

  test("split - invalid input", () => {
    expect(split).type.not.toBeCallableWith(42, "a,b")

    expect(split).type.not.toBeCallableWith(",", 42)
  })
})
