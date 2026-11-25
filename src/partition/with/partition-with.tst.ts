import { expect, test, describe } from "tstyche"

import { partitionWith } from "./partition-with.js"
import { isSomething } from "../../is/is.js"

describe("partitionWith", () => {
  test("partitionWith - uncurried", () => {
    expect(
      partitionWith({ id: isSomething }, [{ id: 1 }, { id: 2 }])
    ).type.toBe<[{ id: number }[], { id: number }[]]>()

    expect(
      partitionWith({ id: isSomething }, [] as { id: number }[])
    ).type.toBe<[{ id: number }[], { id: number }[]]>()

    {
      // a readonly array is accepted
      const input: readonly { id: number }[] = [{ id: 1 }, { id: 2 }]

      expect(partitionWith({ id: 1 }, input)).type.toBe<
        [{ id: number }[], { id: number }[]]
      >()
    }
  })

  test("partitionWith - curried", () => {
    const input = [{ id: 1 }, { id: 2 }]
    const isPositive = (x: number): boolean => x > 0

    expect(partitionWith({ id: isPositive })(input)).type.toBe<
      [{ id: number }[], { id: number }[]]
    >()
  })

  test("partitionWith - invalid input", () => {
    // @ts-expect-error Type 'string' is not assignable to type 'KeyMatcher<number> | undefined'.
    partitionWith({ id: "uuid" }, [{ id: 1 }])

    // @ts-expect-error Type '[string]' is not assignable to type 'KeyMatcher<string[]> | undefined'.
    partitionWith({ tags: ["a"] }, [{ tags: ["a"] }])
  })
})
