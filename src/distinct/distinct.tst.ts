import { expect, test, describe } from "tstyche"

import { distinct } from "./distinct.js"

describe("distinct", () => {
  test("distinct - uncurried", () => {
    expect(distinct([1, 2, 3])).type.toBe<number[]>()

    expect(distinct(["a", "b"])).type.toBe<string[]>()

    {
      const input = [1, "a", 2, "b"]

      expect(distinct(input)).type.toBe<(string | number)[]>()
    }

    {
      const input: readonly number[] = [1, 1]

      expect(distinct(input)).type.toBe<number[]>()
    }
  })
})
