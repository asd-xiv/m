import { describe, expect, test } from "tstyche"

import { max } from "./max.js"

describe("max", () => {
  test("max - uncurried", () => {
    expect(max([1, 2, 3])).type.toBe<number | undefined>()

    const readonlyInput: readonly number[] = [1, 2, 3]

    expect(max(readonlyInput)).type.toBe<number | undefined>()
  })

  test("max - invalid input", () => {
    // @ts-expect-error Type 'string' is not assignable to type 'number'.
    max([1, "2"])
  })
})
