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
    expect(zipToObject).type.not.toBeCallableWith("a", [1])

    expect(zipToObject).type.not.toBeCallableWith(42, [1])

    expect(zipToObject).type.not.toBeCallableWith([1], [1])
  })

  test("zipToObject - aliases", () => {
    expect(zipToObj(["a"], [1])).type.toBe<Record<"a", number>>()
  })
})
