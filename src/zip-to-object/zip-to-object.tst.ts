/* eslint-disable unicorn/prevent-abbreviations */

import { describe, expect, test } from "tstyche"

import { zipToObject, zipToObj } from "./zip-to-object.js"

describe("zipToObject", () => {
  test("zipToObject - uncurried", () => {
    expect(zipToObject(["a", "b"], [1, 2])).type.toBe<
      Record<"a" | "b", number>
    >()

    expect(zipToObject(["x"], ["hello", "world"])).type.toBe<
      Record<"x", string>
    >()

    expect(zipToObject(["a", "b"], [1, "two"])).type.toBe<
      Record<"a" | "b", string | number>
    >()
  })

  test("zipToObject - readonly", () => {
    const keys: readonly ("a" | "b")[] = ["a", "b"]
    const values: readonly number[] = [1, 2]

    expect(zipToObject(keys, values)).type.toBe<Record<"a" | "b", number>>()
    expect(zipToObject(keys)(values)).type.toBe<Record<"a" | "b", number>>()
  })

  test("zipToObject - curried", () => {
    const withKeys = zipToObject(["a", "b"])

    expect(withKeys([1, 2])).type.toBe<Record<"a" | "b", number>>()
    expect(withKeys(["x", "y"])).type.toBe<Record<"a" | "b", string>>()
  })

  test("zipToObject - invalid input", () => {
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'readonly string[]'
    zipToObject("a", [1])

    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type 'readonly string[]'
    zipToObject(42, [1])

    // @ts-expect-error Type 'number' is not assignable to type 'string'
    zipToObject([1], [1])
  })

  test("zipToObject - aliases", () => {
    expect(zipToObj(["a"], [1])).type.toBe<Record<"a", number>>()
  })
})
