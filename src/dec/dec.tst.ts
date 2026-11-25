import { describe, expect, test } from "tstyche"

import { dec } from "./dec.js"

describe("dec", () => {
  test("dec - uncurried", () => {
    expect(dec(1)).type.toBe<number>()
  })

  test("dec - invalid input", () => {
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'number'.
    dec("1")
  })
})
