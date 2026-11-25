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
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'PlainObject'.
    evolveDeepBy((_key, value) => value, "foo")

    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type 'PlainObject'.
    evolveDeepBy((_key, value) => value, 42)
  })
})
