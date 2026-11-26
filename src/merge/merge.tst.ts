import { expect, test, describe } from "tstyche"

import { merge } from "./merge.js"
import type { PlainObject } from "../../types/object.js"

describe("merge", () => {
  test("merge - uncurried", () => {
    expect(merge({ a: 1 }, { b: "two" })).type.toBe<{
      a: number
      b: string
    }>()

    expect(merge({ a: 1 }, { a: "x", b: 2 }, { c: true })).type.toBe<{
      a: string
      b: number
      c: boolean
    }>()
  })

  test("merge - array", () => {
    const objects: readonly { a?: number; b?: number }[] = [{ a: 1 }, { b: 2 }]

    expect(merge(objects)).type.toBe<PlainObject>()
  })

  test("merge - curried", () => {
    const withDefaults = merge({ a: 1, b: 2 })

    expect(withDefaults({ b: 99, c: "new" })).type.toBe<{
      a: number
      b: number
      c: string
    }>()
  })

  test("merge - invalid input", () => {
    expect(merge).type.not.toBeCallableWith(42, { a: 1 })
  })
})
