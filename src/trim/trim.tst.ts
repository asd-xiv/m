import { describe, expect, test } from "tstyche"

import { trim } from "./trim.js"

describe("trim", () => {
  test("trim - uncurried", () => {
    expect(trim(" lorem ")).type.toBe<string>()
    expect(trim({ chars: "-" }, "-lorem-")).type.toBe<string>()
    expect(trim({}, " lorem ")).type.toBe<string>()
  })

  test("trim - curried", () => {
    const trimSlash = trim({ chars: "/" })

    expect(trimSlash).type.toBe<(text: string) => string>()
    expect(trimSlash("/usr/")).type.toBe<string>()
  })

  test("trim - invalid input", () => {
    // @ts-expect-error Argument of type 'number' is not assignable to ...
    trim(123)

    // @ts-expect-error Type '"-"' has no properties in common with type 'TrimOptions'.
    trim("-", "hello")

    // @ts-expect-error Type 'number' is not assignable to type 'string'.
    trim({ chars: 1 }, "hello")

    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type 'string'.
    trim({}, 123)
  })
})
