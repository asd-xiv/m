import { describe, expect, test } from "tstyche"

import { pick } from "./pick.js"
import type { PlainObject } from "../../types/object.js"

describe("pick", () => {
  test("pick - uncurried", () => {
    const input = { name: "Alice", age: 30, role: "admin" }

    expect(pick(["name", "age"], input)).type.toBe<{
      name: string
      age: number
    }>()

    {
      const input = { name: "Alice", age: 30 }

      // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Pick with never[] correctly produces {}
      expect(pick([], input)).type.toBe<{}>()
    }
  })

  test("pick - readonly keys", () => {
    const keys = ["name", "age"] as const
    const input = { name: "Alice", age: 30, role: "admin" }

    expect(pick(keys, input)).type.toBe<{ name: string; age: number }>()
  })

  test("pick - curried", () => {
    // When curried, K is fixed at curry-time but T defaults to PlainObject
    // because the overload binds K extends keyof T before T is known.
    // The returned function accepts any PlainObject and returns Pick<PlainObject, K>.
    const input = { name: "Alice", age: 30, role: "admin" }

    expect(pick(["name", "age"])(input)).type.toBe<
      Pick<PlainObject, "name" | "age">
    >()
  })

  test("pick - invalid input", () => {
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'readonly "name"[]'.
    pick("name", { name: "Alice" })

    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type 'readonly "name"[]'.
    pick(42, { name: "Alice" })
  })
})
