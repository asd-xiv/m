import { expect, test, describe } from "tstyche"

import { countBy } from "./count-by.js"

const isEven = (input: number): boolean => input % 2 === 0

const isPositive = (input: number): boolean => input > 0

describe("countBy", () => {
  test("countBy - uncurried", () => {
    const input = [1, 2, 3]

    expect(
      countBy(item => {
        expect(item).type.toBe<number>()

        return item > 0
      }, input)
    ).type.toBe<number>()

    {
      // a readonly array is accepted
      const input: readonly number[] = [1, 2, 3]

      expect(countBy(isEven, input)).type.toBe<number>()
    }
  })

  test("countBy - curried", () => {
    const input = [1, 2, 3]

    expect(countBy(isPositive)(input)).type.toBe<number>()

    expect(
      countBy(item => {
        expect(item).type.toBe<unknown>()

        return isPositive(item as number)
      })(input)
    ).type.toBe<number>()
  })

  test("countBy - predicate pipe", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(
      countBy(
        [
          item => {
            expect(item).type.toBe<{ id: number }>()

            return item.id
          },
          field => {
            expect(field).type.toBe<number>()

            return field > 0
          },
        ],
        input
      )
    ).type.toBe<number>()
  })

  test("countBy - invalid input", () => {
    const input = [1, "2", 3]

    // @ts-expect-error Argument of type ... is not assignable to parameter of type 'readonly number[]'.
    countBy(isPositive, input)

    const countPositive = countBy(isPositive)

    // @ts-expect-error Argument of type ... is not assignable to parameter of type 'readonly number[]'.
    countPositive(input)
  })
})
