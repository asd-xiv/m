import { describe, expect, test } from "tstyche"

import { isDeepEqual } from "./is-deep-equal.js"

describe("isDeepEqual", () => {
  test("isDeepEqual - uncurried", () => {
    expect(isDeepEqual({ a: [1] }, { a: [1] })).type.toBe<boolean>()
    expect(isDeepEqual(1, "1")).type.toBe<boolean>()
  })

  test("isDeepEqual - curried", () => {
    const isSameTags = isDeepEqual(["a", "b"])

    expect(isSameTags).type.toBe<(right: unknown) => boolean>()
    expect(isSameTags(["a", "b"])).type.toBe<boolean>()
  })

  test("isDeepEqual - invalid input", () => {
    // @ts-expect-error Expected 1-2 arguments, but got 3.
    isDeepEqual(1, 2, 3)
  })
})
