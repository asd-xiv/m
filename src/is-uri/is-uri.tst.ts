import { describe, expect, test } from "tstyche"

import { isURI } from "./is-uri.js"
import { filter } from "../filter/filter.js"

describe("isURI", () => {
  test("isURI - string input", () => {
    expect(isURI("https://example.com")).type.toBe<boolean>()
  })

  test("isURI - as a predicate", () => {
    expect(filter(isURI, ["https://a.b", "nope"])).type.toBe<string[]>()
  })

  test("isURI - invalid input", () => {
    // @ts-expect-error ... type 'number' is not assignable to ... type 'string'
    isURI(42)
    // @ts-expect-error Expected 1 arguments, but got 2
    isURI("a", "b")
    // @ts-expect-error Expected 1 arguments, but got 0
    isURI()
  })
})
