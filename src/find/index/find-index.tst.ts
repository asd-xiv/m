import { expect, test, describe } from "tstyche"

import { findIndex } from "./find-index.js"

const isEven = (input: number): boolean => input % 2 === 0

describe("findIndex", () => {
  test("findIndex - uncurried", () => {
    {
      const input = [1, 2, 3]

      expect(
        findIndex(item => {
          expect(item).type.toBe<number>()

          return isEven(item)
        }, input)
      ).type.toBe<number>()
    }

    {
      const input = [{ id: "string" }, { id: 2 }, { id: 3 }]

      expect(
        findIndex(
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
      ).type.toBe<number>()
    }

    {
      // a readonly array is accepted
      const input: readonly number[] = [1, 2, 3]

      expect(findIndex(isEven, input)).type.toBe<number>()
    }
  })

  test("findIndex - curried", () => {
    {
      const input = [1, 2, 3]

      expect(
        findIndex(item => {
          expect(item).type.toBe<unknown>()

          return isEven(item as number)
        })(input)
      ).type.toBe<number>()
    }

    {
      const input = [1, 2, 3]

      expect(findIndex(isEven)(input)).type.toBe<number>()
    }
  })

  test("findIndex - invalid input", () => {
    {
      const input = [1, "2", 3]

      expect(findIndex).type.not.toBeCallableWith(isEven, input)
    }

    {
      const input = [1, "2", 3]
      const findEvenIndex = findIndex(isEven)

      expect(findEvenIndex).type.not.toBeCallableWith(input)
    }
  })
})
