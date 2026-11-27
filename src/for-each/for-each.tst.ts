/* eslint-disable @typescript-eslint/no-confusing-void-expression, @typescript-eslint/no-invalid-void-type */
import { expect, test, describe } from "tstyche"

import { forEach } from "./for-each.js"

describe("forEach", () => {
  test("forEach - uncurried", () => {
    {
      const input = [1, 2, 3]
      const output = forEach(item => {
        expect(item).type.toBe<number>()
      }, input)

      expect(output).type.toBe<void>()
    }

    {
      const input = [1, 2, 3]

      forEach(item => {
        expect(item).type.toBe<number>()
      }, input)
    }

    {
      const input: readonly number[] = [1, 2, 3]

      forEach(item => {
        expect(item).type.toBe<number>()
      }, input)
    }

    {
      const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

      forEach(
        [
          item => {
            expect(item).type.toBe<{ id: number }>()
            return item.id
          },
          id => {
            expect(id).type.toBe<number>()
          },
        ],
        input
      )
    }
  })

  test("forEach - curried", () => {
    {
      const input = [1, 2, 3]
      const output = forEach(item => {
        expect(item).type.toBe<unknown>()
      })(input)

      expect(output).type.toBe<void>()
    }

    {
      const logNumber = (item: number) => console.log(item)
      const input = [1, 2, 3]

      forEach(logNumber)(input)
    }
  })

  test("forEach - invalid input", () => {
    {
      const input = [1, "2", 3]
      const logNumber = (item: number) => {
        console.log(item)
      }

      expect(forEach).type.not.toBeCallableWith(logNumber, input)
    }

    {
      const input = [1, "2", 3]
      const logNumber = (item: number) => {
        console.log(item)
      }
      const forEachLogNumber = forEach(logNumber)

      expect(forEachLogNumber).type.not.toBeCallableWith(input)
    }
  })
})
