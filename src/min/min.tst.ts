import { describe, expect, test } from "tstyche"

import { min } from "./min.js"

describe("min", () => {
  test("min - uncurried", () => {
    expect(min([1, 2, 3])).type.toBe<number | undefined>()

    const readonlyInput: readonly number[] = [1, 2, 3]

    expect(min(readonlyInput)).type.toBe<number | undefined>()
  })

  test("min - invalid input", () => {
    expect(min).type.not.toBeCallableWith([1, "2"])
  })
})
