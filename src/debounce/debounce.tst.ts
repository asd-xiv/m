import { describe, expect, test } from "tstyche"

import { debounce } from "./debounce.js"

describe("debounce", () => {
  test("debounce - uncurried", () => {
    expect(debounce((a: number, b: string) => `${a}${b}`)).type.toBe<
      (a: number, b: string) => void
    >()

    expect(debounce({ wait: 100 }, (a: number) => a)).type.toBe<
      (a: number) => void
    >()
  })

  test("debounce - invalid input", () => {
    // @ts-expect-error Type 'string' is not assignable to type 'number'.
    debounce({ wait: "100" }, () => undefined)

    // @ts-expect-error Argument of type 'number' is not assignable
    debounce(42)

    debounce((a: number) => a)(
      // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'number'
      "1"
    )
  })
})
