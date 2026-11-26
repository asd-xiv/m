import { expect, test, describe } from "tstyche"

import { unite } from "./unite.js"

describe("unite", () => {
  test("unite - uncurried", () => {
    expect(unite([1, 2], [3, 4])).type.toBe<number[]>()

    {
      const first: readonly number[] = [1, 2]
      const second: readonly number[] = [3, 4]

      expect(unite(first, second)).type.toBe<number[]>()
    }
  })

  test("unite - curried", () => {
    const uniteWith = unite([1, 2])

    expect(uniteWith).type.toBe<(b: readonly number[]) => number[]>()
    expect(uniteWith([3, 4])).type.toBe<number[]>()
  })

  test("unite - invalid input", () => {
    expect(unite).type.not.toBeCallableWith([1, 2], ["a"])
  })
})
