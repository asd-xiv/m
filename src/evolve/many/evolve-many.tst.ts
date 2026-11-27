import { describe, expect, test } from "tstyche"

import { evolveMany } from "./evolve-many.js"

describe("evolveMany", () => {
  test("evolveMany - uncurried", () => {
    const input = [
      { id: 1, count: 0 },
      { id: 2, count: 5 },
    ]

    expect(evolveMany({ count: (x: number) => x + 1 }, input)).type.toBe<
      { id: number; count: number }[]
    >()

    // A readonly array is accepted, the result is a mutable array
    {
      const readonlyInput: readonly { id: number; count: number }[] = input

      expect(evolveMany({ count: String }, readonlyInput)).type.toBe<
        { id: number; count: string }[]
      >()
    }
  })

  test("evolveMany - curried", () => {
    const input = [
      { id: 1, count: 0 },
      { id: 2, count: 5 },
    ]
    const inc = (x: number) => x + 1

    expect(evolveMany({ count: inc })(input)).type.toBe<
      { id: number; count: number }[]
    >()
  })

  test("evolveMany - invalid input", () => {
    const input = [{ id: 1 }, { id: 2 }]

    expect(evolveMany).type.not.toBeCallableWith({ notAKey: () => "x" }, input)

    expect(evolveMany).type.not.toBeCallableWith({ id: 1 }, input)

    expect(evolveMany).type.not.toBeCallableWith({ id: ["x"] }, input)
  })
})
