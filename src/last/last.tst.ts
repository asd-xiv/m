import { expect, test, describe } from "tstyche"

import { last, tail } from "./last.js"

describe("last", () => {
  test("last - uncurried", () => {
    expect(last([1, 2, 3])).type.toBe<number | undefined>()
    expect(last([] as number[])).type.toBe<number | undefined>()
    expect(last([{ id: 1 }, { id: 2 }])).type.toBe<{ id: number } | undefined>()

    const input = [1, 2, 3] as const

    expect(last(input)).type.toBe<1 | 2 | 3 | undefined>()

    const readonlyInput: readonly string[] = ["a", "b"]

    expect(last(readonlyInput)).type.toBe<string | undefined>()

    expect(last("xyz")).type.toBe<string | undefined>()
  })

  test("last - invalid input", () => {
    expect(last).type.not.toBeCallableWith(42)
    expect(last).type.not.toBeCallableWith({ a: 1 })
  })

  test("last - aliases", () => {
    expect(tail([1, 2, 3])).type.toBe<number | undefined>()
    expect(tail("xyz")).type.toBe<string | undefined>()
  })
})
