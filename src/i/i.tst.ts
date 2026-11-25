import { expect, test, describe } from "tstyche"

import { i } from "./i.js"

describe("i", () => {
  test("i - uncurried", () => {
    expect(i(42)).type.toBe<42>()
    expect(i("hello")).type.toBe<"hello">()
    expect(i(null)).type.toBe<null>()

    {
      const input = { a: 1 }

      expect(i(input)).type.toBe<{ a: number }>()
    }
  })
})
