import { expect, test, describe } from "tstyche"

import { keys } from "./keys.js"

describe("keys", () => {
  test("keys - uncurried", () => {
    expect(keys(["a", "b"])).type.toBe<string[]>()
    const readonlyInput: readonly string[] = ["a", "b"]

    expect(keys(readonlyInput)).type.toBe<string[]>()
    expect(keys({ a: 1 })).type.toBe<string[]>()
  })

  test("keys - invalid input", () => {
    expect(keys).type.not.toBeCallableWith("foo")

    expect(keys).type.not.toBeCallableWith(42)
  })
})
