import { expect, test, describe } from "tstyche"

import { filter } from "./filter.js"

const isEven = (input: number): boolean => input % 2 === 0

describe("filter", () => {
  test("filter - uncurried", () => {
    {
      const input = [1, 2, 3]

      expect(
        filter(item => {
          expect(item).type.toBe<number>()

          return isEven(item)
        }, input)
      ).type.toBe<number[]>()
    }

    {
      const input = [{ id: "string" }, { id: 2 }, { id: 3 }]

      expect(
        filter(
          [
            item => {
              expect(item).type.toBe<{ id: string } | { id: number }>()

              return item.id
            },
            field => {
              expect(field).type.toBe<string | number>()

              return typeof field === "number"
            },
          ],
          input
        )
      ).type.toBe<({ id: string } | { id: number })[]>()
    }

    expect(filter(isEven, [])).type.toBe<number[]>()

    {
      // a readonly array is accepted
      const input: readonly number[] = [1, 2, 3]

      expect(filter(isEven, input)).type.toBe<number[]>()
    }
  })

  test("filter - curried", () => {
    {
      const input = [1, 2, 3]

      expect(
        filter(item => {
          expect(item).type.toBe<unknown>()

          return isEven(item as number)
        })(input)
      ).type.toBe<unknown[]>()
    }

    {
      const input = [1, 2, 3]

      expect(filter(isEven)(input)).type.toBe<number[]>()
    }
  })

  test("filter - invalid input", () => {
    const input = [1, "2", 3]

    expect(filter).type.not.toBeCallableWith(isEven, input)

    const filterEven = filter(isEven)

    expect(filterEven).type.not.toBeCallableWith(input)
  })
})
