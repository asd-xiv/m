import { describe, expect, test } from "tstyche"

import { inc } from "./inc.js"

describe("inc", () => {
  test("inc - uncurried", () => {
    expect(inc(1)).type.toBe<number>()
  })

  test("inc - invalid input", () => {
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'number'.
    inc("1")
  })
})
