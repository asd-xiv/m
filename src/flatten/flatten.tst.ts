import { expect, test, describe } from "tstyche"

import { flatten } from "./flatten.js"
import type { PlainObject } from "../../types/object.js"

describe("flatten", () => {
  test("flatten - uncurried", () => {
    expect(flatten([1, [2, [3]]])).type.toBe<number[]>()
    expect(flatten([[{ id: 1 }], [{ id: 2 }]])).type.toBe<{ id: number }[]>()
    expect(flatten({ a: { b: 1 } })).type.toBe<PlainObject>()

    expect(flatten([1, [2, [3]]] as const)).type.toBe<(1 | 2 | 3)[]>()

    expect(flatten({ level: 1 }, [1, [2, [3]]])).type.toBe<
      (number | number[])[]
    >()
    expect(flatten({ level: 2 }, [1, [2, [3]]])).type.toBe<number[]>()
    expect(flatten({ level: 0 }, [1, [2]])).type.toBe<(number | number[])[]>()

    // a level that is not a literal is unknown at the type level
    {
      const flattenTo = (level: number) => flatten({ level }, [1, [2]])

      expect(flattenTo(1)).type.toBe<unknown[]>()
    }

    {
      const items: readonly number[][] = [[1], [2]]

      expect(flatten(items)).type.toBe<number[]>()
    }
    expect(
      flatten({ separator: "__" }, { a: { b: 1 } })
    ).type.toBe<PlainObject>()

    // one argument is always the input, even with an option key
    expect(flatten({ level: 1 })).type.toBe<PlainObject>()
  })

  test("flatten - invalid input", () => {
    expect(flatten).type.not.toBeCallableWith(42)

    expect(flatten).type.not.toBeCallableWith("abc")

    expect(flatten).type.not.toBeCallableWith({ level: "1" }, [1, [2]])
  })
})
