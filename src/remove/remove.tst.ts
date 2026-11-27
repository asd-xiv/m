import { expect, test, describe } from "tstyche"

import { remove } from "./remove.js"

describe("remove", () => {
  test("remove - uncurried", () => {
    expect(remove(3, [1, 2, 3])).type.toBe<number[]>()
    expect(remove("a", ["a", "b"])).type.toBe<string[]>()

    const mixed = [1, "two", true]

    expect(remove("two", mixed)).type.toBe<(string | number | boolean)[]>()
  })

  test("remove - readonly input", () => {
    const input: readonly number[] = [1, 2, 3]

    expect(remove(3, input)).type.toBe<number[]>()
    expect(remove(3)(input)).type.toBe<number[]>()
  })

  test("remove - curried", () => {
    expect(remove(3)([1, 2, 3])).type.toBe<number[]>()
    expect(remove("a")(["a", "b"])).type.toBe<string[]>()
  })

  test("remove - invalid input", () => {
    expect(remove).type.not.toBeCallableWith("a", [1])

    expect(remove("a")).type.not.toBeCallableWith([1])
  })
})
