import { expect, test, describe } from "tstyche"

import { drop } from "./drop.js"

describe("drop", () => {
  test("drop - uncurried", () => {
    {
      const input = [1, 2, 3]

      expect(drop(input)).type.toBe<number[]>()
      expect(drop(2, input)).type.toBe<number[]>()
    }

    {
      const input = [{ id: 1 }, { id: 2 }]

      expect(drop(input)).type.toBe<{ id: number }[]>()
      expect(drop(1, input)).type.toBe<{ id: number }[]>()
    }
  })

  test("drop - readonly input", () => {
    const input: readonly number[] = [1, 2, 3]

    expect(drop(input)).type.toBe<number[]>()
    expect(drop(1, input)).type.toBe<number[]>()
    expect(drop(1)(input)).type.toBe<number[]>()
  })

  test("drop - curried", () => {
    {
      const input = ["a", "b", "c"]
      const applyTwo = drop(2)

      expect(applyTwo(input)).type.toBe<string[]>()
    }

    {
      const input = [{ id: 1 }, { id: 2 }]

      expect(drop(1)(input)).type.toBe<{ id: number }[]>()
    }
  })
})
