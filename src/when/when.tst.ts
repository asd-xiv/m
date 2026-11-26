import { expect, test, describe } from "tstyche"

import { when } from "./when.js"

const isOdd = (input: number): boolean => input % 2 !== 0
const inc = (input: number): number => input + 1
const dec = (input: number): number => input - 1
const toString = (input: number): string => String(input)

describe("when", () => {
  test("when - uncurried", () => {
    expect(when(isOdd, inc, dec, 5)).type.toBe<number>()
    expect(when(isOdd, toString, dec, 5)).type.toBe<string | number>()
  })

  test("when - curried", () => {
    expect(when(isOdd, inc, dec)).type.toBe<(input: number) => number>()
    expect(when(isOdd, inc, dec)(5)).type.toBe<number>()

    expect(when(isOdd, toString, dec)).type.toBe<
      (input: number) => string | number
    >()

    // 2-arg curried: else defaults to identity
    expect(when(isOdd, inc)).type.toBe<(input: number) => number>()
    expect(when(isOdd, inc)(5)).type.toBe<number>()
  })

  test("when - invalid input", () => {
    expect(when).type.not.toBeCallableWith(() => 1, "yes", "no", 5)

    expect(when).type.not.toBeCallableWith(isOdd)

    expect(when).type.not.toBeCallableWith(42, inc, dec, 5)

    expect(when).type.not.toBeCallableWith("foo", inc, dec, 5)
  })
})
