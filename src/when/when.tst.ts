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
    // @ts-expect-error Argument of type ... is not assignable to parameter of type ...
    when(() => 1, "yes", "no", 5)

    // @ts-expect-error Expected 2-4 arguments, but got 1.
    when(isOdd)

    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type ...
    when(42, inc, dec, 5)

    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type ...
    when("foo", inc, dec, 5)
  })
})
