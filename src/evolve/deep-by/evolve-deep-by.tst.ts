import { describe, expect, test } from "tstyche"

import { evolveDeepBy } from "./evolve-deep-by.js"

describe("evolveDeepBy", () => {
  test("evolveDeepBy - uncurried", () => {
    type Input = { a: number; b: string[]; c: { d: "2" } }

    const input: Input = { a: 1, b: ["2"], c: { d: "2" } }
    const output = evolveDeepBy((_key, value) => {
      expect(value).type.toBe<number | string[] | "2">()

      return value
    }, input)

    expect(output).type.toBe<Input>()
  })

  test("evolveDeepBy - curried", () => {
    expect(evolveDeepBy((_key, value) => value)).type.toBe<
      (input: Record<string, unknown>) => Record<string, unknown>
    >()
  })

  test("evolveDeepBy - invalid input", () => {
    expect(evolveDeepBy).type.not.toBeCallableWith(
      (_key: string, value: unknown) => value,
      "foo"
    )

    expect(evolveDeepBy).type.not.toBeCallableWith(
      (_key: string, value: unknown) => value,
      42
    )
  })
})
