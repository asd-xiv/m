import { describe, expect, test } from "tstyche"

import { join } from "./join.js"

describe("join", () => {
  test("join - uncurried", () => {
    expect(join(",", ["a", "b", "c"])).type.toBe<string>()

    {
      const input: readonly string[] = ["a", "b"]

      expect(join(",", input)).type.toBe<string>()
    }
  })

  test("join - curried", () => {
    const joinWithDash = join("-")

    expect(joinWithDash).type.toBe<(input: readonly string[]) => string>()
    expect(joinWithDash(["foo", "bar"])).type.toBe<string>()
  })

  test("join - invalid input", () => {
    expect(join).type.not.toBeCallableWith(42, ["a", "b"])

    expect(join).type.not.toBeCallableWith(",", ["a", 1])

    expect(join(",")).type.not.toBeCallableWith(["a", 1])
  })
})
