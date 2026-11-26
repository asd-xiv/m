import { describe, expect, test } from "tstyche"

import { dec } from "./dec.js"

describe("dec", () => {
  test("dec - uncurried", () => {
    expect(dec(1)).type.toBe<number>()
  })

  test("dec - invalid input", () => {
    expect(dec).type.not.toBeCallableWith("1")
  })
})
