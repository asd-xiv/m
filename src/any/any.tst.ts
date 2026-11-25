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

    // @ts-expect-error Argument of type ... is not assignable to parameter of type ...
    any(isEven, input)

    const anyIsEven = any(isEven)

    // @ts-expect-error Argument of type ... is not assignable to parameter of type 'readonly number[]'.
    anyIsEven(input)

    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type ...
    any(isEven, 42)

    // an array in the first slot is a pipe, not a value
    // @ts-expect-error Argument of type ... is not assignable to parameter of type ...
    any([1, 2], [[1, 2]])
  })

  test("any - aliases", () => {
    expect(has(1)).type.toBe<(input: readonly number[]) => boolean>()
  })
})
