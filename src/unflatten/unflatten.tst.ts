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
    // @ts-expect-error No overload matches this call.
    unflatten(42)

    // @ts-expect-error No overload matches this call.
    unflatten(null)
  })
})
