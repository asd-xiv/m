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

    // @ts-expect-error Type 'string' is not assignable to type 'KeyMatcher<number> | undefined'.
    isMatch({ id: "uuid" }, input)

    // an array is read as a pipe, never as a value: match it with a predicate
    // @ts-expect-error Type '[string]' is not assignable to type 'KeyMatcher<string[]> | undefined'.
    isMatch({ tags: ["a"] }, { tags: ["a"] })

    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type 'Matcher<...>'.
    isMatch(42, input)

    // @ts-expect-error Argument of type 'null' is not assignable to parameter of type 'Matcher<...>'.
    isMatch(null, input)
  })
})
