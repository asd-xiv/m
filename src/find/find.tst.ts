import { expect, test, describe } from "tstyche"

import { find } from "./find.js"

const isEven = (input: number): boolean => input % 2 === 0

describe("find", () => {
  test("find - uncurried", () => {
    {
      const input = [1, 2, 3]

      expect(
        find(item => {
          expect(item).type.toBe<number>()

          return isEven(item)
        }, input)
      ).type.toBe<number | undefined>()
    }

    {
      const input = [{ id: "string" }, { id: 2 }, { id: 3 }]

      expect(
        find(
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
      ).type.toBe<{ id: string } | { id: number } | undefined>()
    }

    {
      // a readonly array is accepted
      const input: readonly number[] = [1, 2, 3]

      expect(find(isEven, input)).type.toBe<number | undefined>()
    }
  })

  test("find - curried", () => {
    {
      const input = [1, 2, 3]

      expect(
        find(item => {
          expect(item).type.toBe<unknown>()

          return isEven(item as number)
        })(input)
      ).type.toBe<unknown>()
    }

    {
      const input = [1, 2, 3]

      expect(find(isEven)(input)).type.toBe<number | undefined>()
    }
  })

  test("find - invalid input", () => {
    {
      const input = [1, "2", 3]

      // @ts-expect-error Type 'string' is not assignable to type 'number'.
      find(isEven, input)
    }

    {
      const input = [1, "2", 3]
      const findEven = find(isEven)

      // @ts-expect-error Type 'string' is not assignable to type 'number'.
      findEven(input)
    }
  })
})
