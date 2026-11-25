import { expect, test, describe } from "tstyche"

import { findIndexWith } from "./find-index-with.js"
import { isSomething } from "../../../is/is.js"

describe("findIndexWith", () => {
  test("findIndexWith - uncurried", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(
      findIndexWith(
        {
          id: field => {
            expect(field).type.toBe<number>()

            return isSomething(field)
          },
        },
        input
      )
    ).type.toBe<number>()

    {
      // a readonly array is accepted
      const input: readonly { id: number }[] = [{ id: 1 }, { id: 2 }]

      expect(findIndexWith({ id: 1 }, input)).type.toBe<number>()
    }
  })

  test("findIndexWith - curried", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(
      findIndexWith({
        id: isSomething,
      })(input)
    ).type.toBe<number>()
  })

  test("findIndexWith - invalid input", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    // @ts-expect-error Type 'string' is not assignable to type
    findIndexWith({ id: "uuid" }, input)

    // @ts-expect-error Type '[string]' is not assignable to type 'KeyMatcher<string[]> | undefined'.
    findIndexWith({ tags: ["a"] }, [{ tags: ["a"] }])
  })
})
