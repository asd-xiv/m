import { describe, expect, test } from "tstyche"

import { debounce } from "./debounce.js"

describe("debounce", () => {
  test("debounce - uncurried", () => {
    expect(debounce((a: number, b: string) => `${a}${b}`)).type.toBe<
      (a: number, b: string) => void
    >()

    expect(debounce({ wait: 100 }, (a: number) => a)).type.toBe<
      (a: number) => void
    >()
  })

  test("debounce - invalid input", () => {
    expect(debounce).type.not.toBeCallableWith({ wait: "100" }, () => undefined)

    expect(debounce).type.not.toBeCallableWith(42)

    expect(debounce((a: number) => a)).type.not.toBeCallableWith("1")
  })
})
