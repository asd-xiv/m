import { expect, test, describe } from "tstyche"

import { filterWith } from "./filter-with.js"
import { isSomething } from "../../is/is.js"

describe("filterWith", () => {
  test("filterWith - uncurried", () => {
    {
      const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

      expect(
        filterWith(
          {
            id: field => {
              expect(field).type.toBe<number>()

              return isSomething(field)
            },
          },
          input
        )
      ).type.toBe<{ id: number }[]>()
    }

    expect(filterWith({ id: isSomething }, [] as { id: number }[])).type.toBe<
      { id: number }[]
    >()

    {
      // a readonly array is accepted
      const input: readonly { id: number }[] = [{ id: 1 }, { id: 2 }]

      expect(filterWith({ id: 1 }, input)).type.toBe<{ id: number }[]>()
    }
  })

  test("filterWith - curried", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    // isSomething is UnaryPredicate<unknown>, so T infers { id: unknown }
    expect(
      filterWith({
        id: isSomething,
      })(input)
    ).type.toBe<{ id: unknown }[]>()

    {
      const isPositive = (x: number): boolean => x > 0

      expect(
        filterWith({
          id: isPositive,
        })(input)
      ).type.toBe<{ id: number }[]>()
    }
  })

  test("filterWith - invalid input", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(filterWith).type.not.toBeCallableWith({ id: "uuid" }, input)

    expect(filterWith).type.not.toBeCallableWith({ tags: ["a"] }, [
      { tags: ["a"] },
    ])
  })
})
