import { describe, expect, test } from "tstyche"

import { evolveWith } from "./evolve-with.js"

describe("evolveWith", () => {
  test("evolveWith - uncurried", () => {
    const input = [
      { id: 1, count: 0 },
      { id: 2, count: 5 },
    ]

    // A matching item takes the evolved type, the others keep theirs
    expect(
      evolveWith({ id: 2 }, { count: (x: number) => x + 1 }, input)
    ).type.toBe<{ id: number; count: number }[]>()

    expect(evolveWith({ id: 2 }, { count: String }, input)).type.toBe<
      ({ id: number; count: number } | { id: number; count: string })[]
    >()

    // A readonly array is accepted, the result is a mutable array
    {
      const readonlyInput: readonly { id: number; count: number }[] = input

      expect(evolveWith({ id: 2 }, { count: String }, readonlyInput)).type.toBe<
        ({ id: number; count: number } | { id: number; count: string })[]
      >()
    }
  })

  test("evolveWith - curried", () => {
    const input = [
      { id: 1, count: 0 },
      { id: 2, count: 5 },
    ]

    expect(
      evolveWith({ id: 2 }, { count: (x: number) => x + 1 })(input)
    ).type.toBe<{ id: number; count: number }[]>()
  })

  test("evolveWith - invalid input", () => {
    const input = [{ id: 1 }, { id: 2 }]

    expect(evolveWith).type.not.toBeCallableWith("42", { id: () => 1 }, input)

    expect(evolveWith).type.not.toBeCallableWith(
      { id: "uuid" },
      { id: () => 1 },
      input
    )

    // A match value is never an array, m reads it as a pipe
    expect(evolveWith).type.not.toBeCallableWith(
      { id: [1] },
      { id: () => 1 },
      input
    )

    expect(evolveWith).type.not.toBeCallableWith({ id: 1 }, { id: 1 }, input)

    expect(evolveWith).type.not.toBeCallableWith(
      { id: 1 },
      { id: ["x"] },
      input
    )
  })
})
