import { expect, test, describe } from "tstyche"

import { read, get } from "./read.js"

type User = { name: string; age: number }
type Nested = { a: { b: { c: string } } }

describe("read", () => {
  test("read - valid input (uncurried)", () => {
    expect(read("name", "fallback", { name: "alice" })).type.toBe<string>()

    const input: Nested = { a: { b: { c: "deep" } } }

    expect(read(["a", "b", "c"], "default", input)).type.toBe<string>()

    expect(
      read([0, 1], 0, [
        [1, 2],
        [3, 4],
      ])
    ).type.toBe<number>()
  })

  test("read - valid input (curried)", () => {
    const user: User = { name: "alice", age: 30 }
    const nested: Nested = { a: { b: { c: "deep" } } }

    // Single key
    expect(read("name")(user)).type.toBe<string>()

    // Single key with default
    expect(read("name", "unknown")(user)).type.toBe<string>()

    // Deep path
    expect(read(["a", "b", "c"])(nested)).type.toBe<string>()

    // Deep path with default
    expect(read(["a", "b"], "fallback")(nested)).type.toBe<
      { c: string } | string
    >()

    // Array index
    expect(
      read([0, 1])([
        [1, 2],
        [3, 4],
      ])
    ).type.toBe<number>()

    // Array index with default
    expect(
      read(
        [0, 1],
        0
      )([
        [1, 2],
        [3, 4],
      ])
    ).type.toBe<number>()
  })

  test("read - readonly path", () => {
    const user: User = { name: "alice", age: 30 }
    const path = ["name"] as const

    expect(read(path)(user)).type.toBe<string>()
  })

  test("read - invalid input", () => {
    // Mismatched default type (uncurried) - default is number, value is string
    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type ...
    read("name", 42, { name: "alice" })

    // Invalid path types
    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type ...
    read(42)

    // @ts-expect-error Argument of type 'null' is not assignable to parameter of type ...
    read(null)
  })

  test("read - aliases", () => {
    const user: User = { name: "alice", age: 30 }

    expect(get("name")(user)).type.toBe<string>()
  })
})
