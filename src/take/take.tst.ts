import { expect, test, describe } from "tstyche"

import { take } from "./take.js"

describe("take", () => {
  test("take - uncurried", () => {
    {
      const input = [1, 2, 3]

      expect(take(input)).type.toBe<number[]>()
      expect(take(2, input)).type.toBe<number[]>()
    }

    {
      const input = [{ id: 1 }, { id: 2 }]

      expect(take(input)).type.toBe<{ id: number }[]>()
      expect(take(1, input)).type.toBe<{ id: number }[]>()
    }
  })

  test("take - readonly input", () => {
    const input: readonly number[] = [1, 2, 3]

    expect(take(input)).type.toBe<number[]>()
    expect(take(1, input)).type.toBe<number[]>()
    expect(take(1)(input)).type.toBe<number[]>()
  })

  test("take - curried", () => {
    {
      const input = ["a", "b", "c"]
      const applyTwo = take(2)

      expect(applyTwo(input)).type.toBe<string[]>()
    }

    {
      const input = [{ id: 1 }, { id: 2 }]

      expect(take(1)(input)).type.toBe<{ id: number }[]>()
    }
  })
})
