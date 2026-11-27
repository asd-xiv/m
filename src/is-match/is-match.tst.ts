import { expect, test, describe } from "tstyche"

import { isMatch } from "./is-match.js"
import { isSomething } from "../is/is.js"

describe("isMatch", () => {
  test("isMatch - uncurried", () => {
    const input = { id: 1, name: "John" }

    expect(
      isMatch(
        {
          id: field => {
            expect(field).type.toBe<number>()

            return isSomething(field)
          },
        },
        input
      )
    ).type.toBe<boolean>()

    expect(
      isMatch(
        {
          id: 1,
          name: "John",
        },
        input
      )
    ).type.toBe<boolean>()

    expect(
      isMatch(
        {
          name: [
            (item: string) => item.toUpperCase(),
            (item: string) => item === "JOHN",
          ],
        },
        input
      )
    ).type.toBe<boolean>()
  })

  test("isMatch - curried", () => {
    expect(
      isMatch({
        id: isSomething,
      })({ id: 1, name: "John" })
    ).type.toBe<boolean>()

    expect(
      isMatch({
        id: 1,
        name: "John",
      })({ id: 1, name: "John", extra: true })
    ).type.toBe<boolean>()

    expect(
      isMatch({
        "name": "John",
        "!parentId": null,
      })({ id: 2, parentId: null, name: "John" })
    ).type.toBe<boolean>()
  })

  test("isMatch - invalid input", () => {
    const input = { id: 1, name: "John" }

    expect(isMatch).type.not.toBeCallableWith({ id: "uuid" }, input)

    // an array is read as a pipe, never as a value: match it with a predicate
    expect(isMatch).type.not.toBeCallableWith({ tags: ["a"] }, { tags: ["a"] })

    expect(isMatch).type.not.toBeCallableWith(42, input)

    expect(isMatch).type.not.toBeCallableWith(null, input)
  })
})
