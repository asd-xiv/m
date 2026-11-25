import { describe, expect, test } from "tstyche"

import { sum } from "./sum.js"

describe("sum", () => {
  test("sum - uncurried", () => {
    expect(sum(1, 2, 3)).type.toBe<number>()

    expect(sum([1, 2, 3])).type.toBe<number>()

    const readonlyInput: readonly number[] = [1, 2, 3]

    expect(sum(readonlyInput)).type.toBe<number>()
  })

  test("sum - invalid input", () => {
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'number'.
    sum(1, "2")

    // @ts-expect-error No overload matches this call.
    sum([1, "2"])
  })
})
