import { expect, test, describe } from "tstyche"

import { values } from "./values.js"

describe("values", () => {
  test("values - uncurried", () => {
    expect(values(["a", "b"])).type.toBe<string[]>()

    const readonlyInput: readonly number[] = [1, 2]

    expect(values(readonlyInput)).type.toBe<number[]>()

    expect(values({ a: 1, b: "x" })).type.toBe<(string | number)[]>()
  })

  test("values - invalid input", () => {
    expect(values).type.not.toBeCallableWith("foo")

    expect(values).type.not.toBeCallableWith(42)
  })
})
