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
    // @ts-expect-error Argument of type '"x"' is not assignable to parameter of type '0'.
    defaultTo(0, "x")
  })
})
