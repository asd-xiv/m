import { expect, test, describe } from "tstyche"

import { type } from "./type.js"

describe("type", () => {
  test("type - uncurried", () => {
    expect(type(42)).type.toBe<string>()
    expect(type("hello")).type.toBe<string>()
    expect(type(null)).type.toBe<string>()
    expect(type(undefined)).type.toBe<string>()
    expect(type()).type.toBe<string>()
    expect(type([])).type.toBe<string>()
    expect(type({})).type.toBe<string>()
  })
})
