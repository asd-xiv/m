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
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'readonly unknown[] | Record<string, unknown>'.
    keys("foo")

    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type 'readonly unknown[] | Record<string, unknown>'.
    keys(42)
  })
})
