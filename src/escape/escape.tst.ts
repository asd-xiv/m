import { describe, expect, test } from "tstyche"

import { escape } from "./escape.js"

describe("escape", () => {
  test("escape - uncurried", () => {
    expect(escape(/\./g, "foo.bar")).type.toBe<string>()
    expect(escape(".", "foo.bar")).type.toBe<string>()
  })

  test("escape - curried", () => {
    const escapeDots = escape(/\./g)

    expect(escapeDots).type.toBe<(input: string) => string>()
    expect(escapeDots("foo.bar")).type.toBe<string>()
  })

  test("escape - invalid input", () => {
    expect(escape).type.not.toBeCallableWith(42, "foo")

    expect(escape).type.not.toBeCallableWith(/\./g, 42)
  })
})
