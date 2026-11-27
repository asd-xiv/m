import { expect, test, describe } from "tstyche"

import { unflatten } from "./unflatten.js"
import type { PlainObject } from "../../types/object.js"

describe("unflatten", () => {
  test("unflatten - uncurried", () => {
    expect(unflatten({ "a.b": 1 })).type.toBe<PlainObject>()
    expect(unflatten("__", { a__b: 1 })).type.toBe<PlainObject>()
  })

  test("unflatten - curried", () => {
    const unflattenDash = unflatten("__")

    expect(unflattenDash({ a__b: 1 })).type.toBe<PlainObject>()
  })

  test("unflatten - invalid input", () => {
    expect(unflatten).type.not.toBeCallableWith(42)

    expect(unflatten).type.not.toBeCallableWith(null)
  })
})
