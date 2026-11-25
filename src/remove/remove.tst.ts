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
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'number'.
    remove("a", [1])

    // @ts-expect-error Type 'number' is not assignable to type 'string'.
    remove("a")([1])
  })
})
