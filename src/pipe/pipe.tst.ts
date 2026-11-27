import { expect, test, describe } from "tstyche"

import { pipe } from "./pipe.js"

const inc = (input: number): number => input + 1
const toString = (input: number): string => String(input)
const getLength = (input: string): number => input.length

describe("pipe", () => {
  test("pipe - uncurried", () => {
    expect(pipe(inc)(2)).type.toBe<number>()

    expect(pipe(inc, inc)(2)).type.toBe<number>()

    expect(pipe(inc, toString)(2)).type.toBe<string>()

    expect(pipe(inc, toString, getLength)(2)).type.toBe<number>()
  })

  test("pipe - invalid input", () => {
    expect(pipe).type.not.toBeCallableWith(toString, inc)
  })
})
