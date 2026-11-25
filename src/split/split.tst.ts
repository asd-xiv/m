import { describe, expect, test } from "tstyche"

import { split } from "./split.js"

describe("split", () => {
  test("split - uncurried", () => {
    expect(split(",", "a,b,c")).type.toBe<string[]>()

    expect(split(/[,-]/, "foo,bar-baz")).type.toBe<string[]>()
  })

  test("split - curried", () => {
    const splitOnComma = split(",")

    expect(splitOnComma).type.toBe<(input: string) => string[]>()
    expect(splitOnComma("a,b")).type.toBe<string[]>()
  })

  test("split - invalid input", () => {
    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type 'string | RegExp'.
    split(42, "a,b")

    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type 'string'.
    split(",", 42)
  })
})
