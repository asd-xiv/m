import { describe, expect, test } from "tstyche"

import { first, head } from "./first.js"

describe("first", () => {
  test("first - uncurried", () => {
    expect(first([1, 2, 3])).type.toBe<number | undefined>()
    expect(first([] as number[])).type.toBe<number | undefined>()
    expect(first([{ id: 1 }, { id: 2 }])).type.toBe<
      { id: number } | undefined
    >()

    const input = [1, 2, 3] as const

    expect(first(input)).type.toBe<1 | 2 | 3 | undefined>()

    const readonlyInput: readonly string[] = ["a", "b"]

    expect(first(readonlyInput)).type.toBe<string | undefined>()

    expect(first("xyz")).type.toBe<string | undefined>()
  })

  test("first - invalid input", () => {
    expect(first).type.not.toBeCallableWith(42)
    expect(first).type.not.toBeCallableWith({ a: 1 })
  })

  test("first - aliases", () => {
    expect(head([1, 2, 3])).type.toBe<number | undefined>()
    expect(head("xyz")).type.toBe<string | undefined>()
  })
})
