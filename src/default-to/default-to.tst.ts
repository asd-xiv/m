import { expect, test, describe } from "tstyche"

import { defaultTo } from "./default-to.js"

describe("defaultTo", () => {
  test("defaultTo - uncurried", () => {
    {
      const result = defaultTo(0, null as number | null)

      expect(result).type.toBe<number>()
    }

    {
      const result = defaultTo(0, undefined as number | undefined)

      expect(result).type.toBe<number>()
    }

    {
      const result = defaultTo("fallback", "hello")

      expect(result).type.toBe<"fallback" | "hello">()
    }

    {
      const input = "hello" as string | null
      const result = defaultTo("fallback", input)

      expect(result).type.toBe<string>()
    }
  })

  test("defaultTo - curried", () => {
    const withZero = defaultTo(0)

    expect(withZero).type.toBe<(input: number | null | undefined) => number>()

    const result = defaultTo(0)(null as number | null)

    expect(result).type.toBe<number>()
  })

  test("defaultTo - invalid input", () => {
    expect(defaultTo).type.not.toBeCallableWith(0, "x")
  })
})
