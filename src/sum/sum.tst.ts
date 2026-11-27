import { describe, expect, test } from "tstyche"

import { sum } from "./sum.js"

describe("sum", () => {
  test("sum - uncurried", () => {
    expect(sum(1, 2, 3)).type.toBe<number>()

    expect(sum([1, 2, 3])).type.toBe<number>()

    const readonlyInput: readonly number[] = [1, 2, 3]

    expect(sum(readonlyInput)).type.toBe<number>()
  })

  test("sum - invalid input", () => {
    expect(sum).type.not.toBeCallableWith(1, "2")

    expect(sum).type.not.toBeCallableWith([1, "2"])
  })
})
