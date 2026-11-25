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
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'readonly unknown[]'.
    values("foo")

    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type 'readonly unknown[]'.
    values(42)
  })
})
