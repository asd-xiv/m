import { expect, test, describe } from "tstyche"

import { any, has } from "./any.js"

const isEven = (input: number): boolean => input % 2 === 0

describe("any", () => {
  test("any - uncurried", () => {
    const input = [1, 2, 3]

    expect(
      any(item => {
        expect(item).type.toBe<number>()

        return isEven(item)
      }, input)
    ).type.toBe<boolean>()

    expect(any(isEven, input)).type.toBe<boolean>()
    expect(any(1, input)).type.toBe<boolean>()

    {
      const items = [{ id: "string" }, { id: 2 }, { id: 3 }]

      expect(
        any(
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
          items
        )
      ).type.toBe<boolean>()
    }

    {
      // a readonly array is accepted
      const input: readonly number[] = [1, 2, 3]

      expect(any(isEven, input)).type.toBe<boolean>()
    }
  })

  test("any - curried", () => {
    const input = [1, 2, 3]

    expect(any(isEven)(input)).type.toBe<boolean>()
    expect(any(1)(input)).type.toBe<boolean>()

    expect(
      any(item => {
        expect(item).type.toBe<unknown>()

        return isEven(item as number)
      })(input)
    ).type.toBe<boolean>()
  })

  test("any - invalid input", () => {
    const input = [1, "2", 3]

    expect(any).type.not.toBeCallableWith(isEven, input)

    const anyIsEven = any(isEven)

    expect(anyIsEven).type.not.toBeCallableWith(input)

    expect(any).type.not.toBeCallableWith(isEven, 42)

    // an array in the first slot is a pipe, not a value
    expect(any).type.not.toBeCallableWith([1, 2], [[1, 2]])
  })

  test("any - aliases", () => {
    expect(has(1)).type.toBe<(input: readonly number[]) => boolean>()
  })
})
