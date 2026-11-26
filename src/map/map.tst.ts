import { expect, test, describe } from "tstyche"

import { map } from "./map.js"

const square = (input: number): number => input * input
const inc = (input: number): number => input + 1

describe("map", () => {
  test("map - uncurried", () => {
    {
      const input = [1, 2, 3]

      expect(
        map(item => {
          expect(item).type.toBe<number>()

          return item * 2
        }, input)
      ).type.toBe<number[]>()
    }

    {
      const input = [1, 2, 3] as const

      expect(
        map(item => {
          expect(item).type.toBeAssignableTo<number>()

          return item * 2
        }, input)
      ).type.toBe<number[]>()
    }

    {
      const input = [{ value: 2 }, { value: 3 }]

      expect(
        map([item => item.value, v => v * 10, v => String(v)], input)
      ).type.toBe<string[]>()
    }

    {
      const input = [1, 2, 3] as const

      expect(map(square, input)).type.toBe<number[]>()
      expect(map([square, inc], input)).type.toBe<number[]>()
    }
  })

  test("map - curried", () => {
    {
      const input = [1, 2, 3]

      expect(
        map(item => {
          expect(item).type.toBe<unknown>()

          return (item as number) * 2
        })(input)
      ).type.toBe<number[]>()
    }

    {
      const input = [1, 2, 3]

      expect(map(square)(input)).type.toBe<number[]>()
      expect(map([square, inc])(input)).type.toBe<number[]>()
    }

    {
      const input = [1, 2, 3] as const

      expect(map(square)(input)).type.toBe<number[]>()
    }
  })

  test("map - invalid input", () => {
    expect(map).type.not.toBeCallableWith(
      (item: number, index: number) => item + index,
      [1, 2]
    )

    {
      const input = [1, "2", 3]

      expect(map).type.not.toBeCallableWith(square, input)
    }

    {
      const input = [1, "2", 3]
      const doubleAll = map(square)

      expect(doubleAll).type.not.toBeCallableWith(input)
    }
  })
})
