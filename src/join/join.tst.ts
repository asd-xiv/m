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
    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type 'string'.
    join(42, ["a", "b"])

    // @ts-expect-error Type 'number' is not assignable to type 'string'.
    join(",", ["a", 1])

    // @ts-expect-error Type 'number' is not assignable to type 'string'.
    join(",")(["a", 1])
  })
})
