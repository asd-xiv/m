import { expect, test, describe } from "tstyche"

import { allWith } from "./all-with.js"
import { isSomething } from "../../is/is.js"

describe("allWith", () => {
  test("allWith - uncurried", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(
      allWith(
        {
          id: field => {
            expect(field).type.toBe<number>()

            return isSomething(field)
          },
        },
        input
      )
    ).type.toBe<boolean>()

    {
      // a readonly array is accepted
      const input: readonly { id: number }[] = [{ id: 1 }, { id: 2 }]

      expect(allWith({ id: 1 }, input)).type.toBe<boolean>()
    }
  })

  test("allWith - curried", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(
      allWith({
        id: isSomething,
      })(input)
    ).type.toBe<boolean>()
  })

  test("allWith - invalid input", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    // @ts-expect-error Type 'string' is not assignable to type 'KeyMatcher<number> | undefined'.
    allWith({ id: "uuid" }, input)

    // @ts-expect-error Object literal may only specify known properties, and 'id' does not exist in type 'readonly { id: unknown; }[]'.
    allWith({ id: isSomething }, { id: 1, name: "test" })

    // @ts-expect-error Type '[string]' is not assignable to type 'KeyMatcher<string[]> | undefined'.
    allWith({ tags: ["a"] }, [{ tags: ["a"] }])
  })
})
