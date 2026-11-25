import { expect, test, describe } from "tstyche"

import { count, length, size } from "./count.js"

describe("count", () => {
  test("count - uncurried", () => {
    expect(count([1, 2, 3])).type.toBe<number>()
    expect(count([] as number[])).type.toBe<number>()

    const input = [1, 2, 3] as const

    expect(count(input)).type.toBe<number>()

    expect(count("hello")).type.toBe<number>()
  })

  test("count - invalid input", () => {
    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type ...
    count(42)

    // @ts-expect-error Argument of type '{ a: number; }' is not assignable to parameter of type ...
    count({ a: 1 })
  })

  test("count - aliases", () => {
    expect(length([1, 2, 3])).type.toBe<number>()
    expect(length("xyz")).type.toBe<number>()
    expect(size([1, 2, 3])).type.toBe<number>()
    expect(size("xyz")).type.toBe<number>()
  })
})
