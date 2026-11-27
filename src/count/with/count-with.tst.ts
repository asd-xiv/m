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

    expect(countWith).type.not.toBeCallableWith({ id: "uuid" }, input)

    expect(countWith).type.not.toBeCallableWith({ tags: ["a"] }, [
      { tags: ["a"] },
    ])
  })
})
