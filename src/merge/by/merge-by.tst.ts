import { expect, test, describe } from "tstyche"

import { mergeBy } from "./merge-by.js"
import type { PlainObject } from "../../../types/object.js"
import { isSomething } from "../../is/is.js"

const definedWins = (left: unknown, right: unknown) =>
  isSomething(right) ? right : left

describe("mergeBy", () => {
  test("mergeBy - uncurried", () => {
    expect(mergeBy(definedWins, { a: 1 }, { a: 2 })).type.toBe<PlainObject>()
  })

  test("mergeBy - curried", () => {
    const mergeWithDefaults = mergeBy(definedWins, { port: 3000 })

    expect(mergeWithDefaults).type.toBe<(b: PlainObject) => PlainObject>()
    expect(mergeWithDefaults({ port: undefined })).type.toBe<PlainObject>()
  })

  test("mergeBy - invalid input", () => {
    expect(mergeBy).type.not.toBeCallableWith(definedWins)

    expect(mergeBy).type.not.toBeCallableWith(42, { a: 1 }, { a: 2 })
  })
})
