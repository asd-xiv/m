import { expect, test, describe } from "tstyche"

import { findWith } from "./find-with.js"
import { isSomething } from "../../is/is.js"

describe("findWith", () => {
  test("findWith - uncurried", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(
      findWith(
        {
          id: field => {
            expect(field).type.toBe<number>()

            return isSomething(field)
          },
        },
        input
      )
    ).type.toBe<{ id: number } | undefined>()

    {
      // a readonly array is accepted
      const input: readonly { id: number }[] = [{ id: 1 }, { id: 2 }]

      expect(findWith({ id: 1 }, input)).type.toBe<{ id: number } | undefined>()
    }
  })

  test("findWith - curried", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(
      findWith({
        id: isSomething,
      })(input)
    ).type.toBe<{ id: unknown } | undefined>()
  })

  test("findWith - invalid input", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(findWith).type.not.toBeCallableWith({ id: "uuid" }, input)

    expect(findWith).type.not.toBeCallableWith({ tags: ["a"] }, [
      { tags: ["a"] },
    ])
  })
})
