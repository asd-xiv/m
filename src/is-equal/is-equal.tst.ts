import { expect, test, describe } from "tstyche"

import { isEqual } from "./is-equal.js"

describe("isEqual", () => {
  test("isEqual - uncurried", () => {
    expect(isEqual(1, 2)).type.toBe<boolean>()
  })

  test("isEqual - curried", () => {
    {
      const isEqualTo1 = isEqual(1)

      expect(isEqualTo1).type.toBe<(b: number) => boolean>()
      expect(isEqualTo1(2)).type.toBe<boolean>()
    }

    {
      const isEqualToFoo = isEqual("foo")

      expect(isEqualToFoo).type.toBe<(b: string) => boolean>()
      expect(isEqualToFoo("bar")).type.toBe<boolean>()
    }
  })

  test("isEqual - invalid input", () => {
    expect(isEqual).type.not.toBeCallableWith(1, "2")

    const isEqualTo1 = isEqual(1)

    expect(isEqualTo1).type.not.toBeCallableWith("2")
  })
})
