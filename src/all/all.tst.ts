import { expect, test, describe } from "tstyche"

import { all } from "./all.js"

const isEven = (input: number): boolean => input % 2 === 0

describe("all", () => {
  test("all - uncurried", () => {
    const input = [1, 2, 3]

    expect(
      all(item => {
        expect(item).type.toBe<number>()

        return isEven(item)
      }, input)
    ).type.toBe<boolean>()

    expect(all(isEven, input)).type.toBe<boolean>()

    {
      const input = [{ id: "string" }, { id: 2 }, { id: 3 }]

      expect(
        all(
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
      ).type.toBe<boolean>()
    }

    {
      // a readonly array is accepted
      const input: readonly number[] = [1, 2, 3]

      expect(all(isEven, input)).type.toBe<boolean>()
    }
  })

  test("all - curried", () => {
    const input = [1, 2, 3]

    expect(all(isEven)(input)).type.toBe<boolean>()

    expect(
      all(item => {
        expect(item).type.toBe<unknown>()

        return isEven(item as number)
      })(input)
    ).type.toBe<boolean>()
  })

  test("all - invalid input", () => {
    const input = [1, "2", 3]

    expect(all).type.not.toBeCallableWith(isEven, input)

    const allIsEven = all(isEven)

    expect(allIsEven).type.not.toBeCallableWith(input)

    expect(all).type.not.toBeCallableWith(isEven, 42)
  })
})
