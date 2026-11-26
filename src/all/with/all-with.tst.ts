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

    expect(allWith).type.not.toBeCallableWith({ id: "uuid" }, input)

    expect(allWith).type.not.toBeCallableWith(
      { id: isSomething },
      { id: 1, name: "test" }
    )

    expect(allWith).type.not.toBeCallableWith({ tags: ["a"] }, [
      { tags: ["a"] },
    ])
  })
})
