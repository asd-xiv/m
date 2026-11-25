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
    expect(isURI).type.not.toBeCallableWith(42)
    expect(isURI).type.not.toBeCallableWith("a", "b")
    expect(isURI).type.not.toBeCallableWith()
  })
})
