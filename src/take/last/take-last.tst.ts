import { expect, test, describe } from "tstyche"

import { takeLast } from "./take-last.js"

describe("takeLast", () => {
  test("takeLast - uncurried", () => {
    {
      const input = [1, 2, 3]

      expect(takeLast(input)).type.toBe<number[]>()
      expect(takeLast(2, input)).type.toBe<number[]>()
    }

    {
      const input = [{ id: 1 }, { id: 2 }]

      expect(takeLast(input)).type.toBe<{ id: number }[]>()
      expect(takeLast(1, input)).type.toBe<{ id: number }[]>()
    }
  })

  test("takeLast - readonly input", () => {
    const input: readonly number[] = [1, 2, 3]

    expect(takeLast(input)).type.toBe<number[]>()
    expect(takeLast(1, input)).type.toBe<number[]>()
    expect(takeLast(1)(input)).type.toBe<number[]>()
  })

  test("takeLast - curried", () => {
    {
      const input = ["a", "b", "c"]
      const applyTwo = takeLast(2)

      expect(applyTwo(input)).type.toBe<string[]>()
    }

    {
      const input = [{ id: 1 }, { id: 2 }]

      expect(takeLast(1)(input)).type.toBe<{ id: number }[]>()
    }
  })
})
