import { expect, test, describe } from "tstyche"

import { removeWith } from "./remove-with.js"
import { isSomething } from "../../is/is.js"

describe("removeWith", () => {
  test("removeWith - uncurried", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(
      removeWith(
        {
          id: field => {
            expect(field).type.toBe<number>()

            return isSomething(field)
          },
        },
        input
      )
    ).type.toBe<{ id: number }[]>()

    expect(removeWith({ id: isSomething }, [] as { id: number }[])).type.toBe<
      { id: number }[]
    >()
  })

  test("removeWith - readonly input", () => {
    const input: readonly { id: number }[] = []

    expect(removeWith({ id: isSomething }, input)).type.toBe<{ id: number }[]>()
  })

  test("removeWith - curried", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    // isSomething is UnaryPredicate<unknown>, so T infers { id: unknown }
    expect(
      removeWith({
        id: isSomething,
      })(input)
    ).type.toBe<{ id: unknown }[]>()

    const isPositive = (x: number): boolean => x > 0

    expect(
      removeWith({
        id: isPositive,
      })(input)
    ).type.toBe<{ id: number }[]>()
  })

  test("removeWith - invalid input", () => {
    expect(removeWith).type.not.toBeCallableWith({ id: isSomething }, { id: 1 })

    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(removeWith).type.not.toBeCallableWith({ id: "uuid" }, input)

    expect(removeWith).type.not.toBeCallableWith({ id: [1, 2] }, input)
  })
})
