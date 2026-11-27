import { describe, expect, test } from "tstyche"

import { throttle } from "./throttle.js"

describe("throttle", () => {
  test("throttle - uncurried", () => {
    expect(throttle((a: number, b: string) => `${a}${b}`)).type.toBe<
      (a: number, b: string) => void
    >()

    expect(
      throttle({ wait: 100, hasLastCall: true }, (a: number) => a)
    ).type.toBe<(a: number) => void>()
  })

  test("throttle - invalid input", () => {
    expect(throttle).type.not.toBeCallableWith(
      { hasLastCall: "yes" },
      () => undefined
    )

    expect(throttle).type.not.toBeCallableWith(42)

    expect(throttle((a: number) => a)).type.not.toBeCallableWith("1")
  })
})
