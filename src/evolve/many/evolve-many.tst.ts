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

    // @ts-expect-error 'notAKey' does not exist in type ...
    evolveMany({ notAKey: () => "x" }, input)

    // @ts-expect-error Type 'number' is not assignable to type 'KeyEvolver<number, { id: number; }> | undefined'.
    evolveMany({ id: 1 }, input)

    // @ts-expect-error Type '[string]' is not assignable to type 'KeyEvolver<number, { id: number; }> | undefined'.
    evolveMany({ id: ["x"] }, input)
  })
})
