import { expect, test, describe } from "tstyche"

import { intersect } from "./intersect.js"

describe("intersect", () => {
  test("intersect - uncurried", () => {
    expect(intersect([1, 2], [2, 3])).type.toBe<number[]>()

    {
      const first: readonly number[] = [1, 2]
      const second: readonly number[] = [2, 3]

      expect(intersect(first, second)).type.toBe<number[]>()
    }
  })

  test("intersect - curried", () => {
    const intersectWith = intersect([1, 2])

    expect(intersectWith).type.toBe<(input: readonly number[]) => number[]>()
    expect(intersectWith([2, 3])).type.toBe<number[]>()
  })

  test("intersect - invalid input", () => {
    expect(intersect).type.not.toBeCallableWith([1, 2], ["a"])
  })
})
