import { expect, test, describe } from "tstyche"

import { countWith } from "./count-with.js"
import { isSomething } from "../../is/is.js"

describe("countWith", () => {
  test("countWith - uncurried", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(
      countWith(
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

      expect(countWith({ id: 1 }, input)).type.toBe<number>()
    }
  })

  test("countWith - curried", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(
      countWith({
        id: isSomething,
      })(input)
    ).type.toBe<number>()
  })

  test("countWith - invalid input", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    // @ts-expect-error Type 'string' is not assignable to type 'KeyMatcher<number> | undefined'.
    countWith({ id: "uuid" }, input)

    // @ts-expect-error Type '[string]' is not assignable to type 'KeyMatcher<string[]> | undefined'.
    countWith({ tags: ["a"] }, [{ tags: ["a"] }])
  })
})
