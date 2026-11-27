import { expect, test, describe } from "tstyche"

import { anyWith, hasWith } from "./any-with.js"
import { isSomething } from "../../is/is.js"

describe("anyWith", () => {
  test("anyWith - uncurried", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(
      anyWith(
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

      expect(anyWith({ id: 1 }, input)).type.toBe<boolean>()
    }
  })

  test("anyWith - curried", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(
      anyWith({
        id: isSomething,
      })(input)
    ).type.toBe<boolean>()
  })

  test("anyWith - invalid input", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(anyWith).type.not.toBeCallableWith({ id: "uuid" }, input)

    expect(anyWith).type.not.toBeCallableWith(
      { id: isSomething },
      { id: 1, name: "test" }
    )

    expect(anyWith).type.not.toBeCallableWith({ tags: ["a"] }, [
      { tags: ["a"] },
    ])
  })

  test("anyWith - aliases", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(hasWith({ id: isSomething }, input)).type.toBe<boolean>()
  })
})
