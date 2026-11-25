import { describe, expect, test } from "tstyche"

import { throttle } from "./throttle.js"

describe("throttle", () => {
  test("throttle - uncurried", () => {
    expect(throttle((a: number, b: string) => `${a}${b}`)).type.toBe<
      (a: number, b: string) => void
    >()

    expect(
      throttle({ wait: 100, hasLastCall: true }, (a: number) => a)
    ).type.toBe<(a: number) => void>()
  })

  test("throttle - invalid input", () => {
    // @ts-expect-error Type 'string' is not assignable to type 'boolean
    throttle({ hasLastCall: "yes" }, () => undefined)

    // @ts-expect-error Argument of type 'number' is not assignable
    throttle(42)

    throttle((a: number) => a)(
      // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'number'
      "1"
    )
  })
})
