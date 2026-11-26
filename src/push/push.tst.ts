import { describe, expect, test } from "tstyche"

import { push } from "./push.js"

describe("push", () => {
  test("push - curried", () => {
    expect(push(4)([1, 2, 3])).type.toBe<number[]>()

    const readonlyInput: readonly number[] = [1, 2, 3]

    expect(push(4)(readonlyInput)).type.toBe<number[]>()

    expect(push("a", "b")([1, 2, 3])).type.toBe<(string | number)[]>()
  })

  test("push - invalid input", () => {
    expect(push(4)).type.not.toBeCallableWith("not-an-array")
  })
})
