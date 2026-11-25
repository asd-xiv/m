import { expect, test, describe } from "tstyche"

import { dropLast } from "./drop-last.js"

describe("dropLast", () => {
  test("dropLast - uncurried", () => {
    {
      const input = [1, 2, 3]

      expect(dropLast(input)).type.toBe<number[]>()
      expect(dropLast(2, input)).type.toBe<number[]>()
    }

    {
      const input = [{ id: 1 }, { id: 2 }]

      expect(dropLast(input)).type.toBe<{ id: number }[]>()
      expect(dropLast(1, input)).type.toBe<{ id: number }[]>()
    }
  })

  test("dropLast - readonly input", () => {
    const input: readonly number[] = [1, 2, 3]

    expect(dropLast(input)).type.toBe<number[]>()
    expect(dropLast(1, input)).type.toBe<number[]>()
    expect(dropLast(1)(input)).type.toBe<number[]>()
  })

  test("dropLast - curried", () => {
    {
      const input = ["a", "b", "c"]
      const dropTwo = dropLast(2)

      expect(dropTwo(input)).type.toBe<string[]>()
    }

    {
      const input = [{ id: 1 }, { id: 2 }]

      expect(dropLast(1)(input)).type.toBe<{ id: number }[]>()
    }
  })
})
