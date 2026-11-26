import { describe, expect, test } from "tstyche"

import { inc } from "./inc.js"

describe("inc", () => {
  test("inc - uncurried", () => {
    expect(inc(1)).type.toBe<number>()
  })

  test("inc - invalid input", () => {
    expect(inc).type.not.toBeCallableWith("1")
  })
})
