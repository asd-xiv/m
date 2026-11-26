import { expect, test, describe } from "tstyche"

import { updateWith } from "./update-with.js"
import { isSomething } from "../../is/is.js"

describe("updateWith", () => {
  test("updateWith - uncurried", () => {
    const input = [
      { id: 1, count: 0 },
      { id: 2, count: 5 },
    ]

    expect(
      updateWith({ id: 2 }, { count: (x: number) => x + 1 }, input)
    ).type.toBe<{ id: number; count: number }[]>()

    {
      const input = [
        { id: 1, name: "foo" },
        { id: 2, name: "bar" },
      ]

      expect(
        updateWith(
          {
            name: (field: string) => {
              expect(field).type.toBe<string>()

              return isSomething(field)
            },
          },
          { id: 99 },
          input
        )
      ).type.toBe<{ id: number; name: string }[]>()
    }
  })

  test("updateWith - readonly input", () => {
    const input: readonly { id: number; count: number }[] = [
      { id: 1, count: 0 },
    ]

    // The input may be readonly, the result is a mutable array
    expect(updateWith({ id: 1 }, { count: 2 }, input)).type.toBe<
      { id: number; count: number }[]
    >()

    expect(updateWith({ id: 1 }, { count: 2 })(input)).type.toBe<
      { id: number; count: number }[]
    >()
  })

  test("updateWith - curried", () => {
    const input = [
      { id: 1, count: 0 },
      { id: 2, count: 5 },
    ]

    // Curried: T is inferred from the filter, but the returned function
    // accepts any superset U extends T, preserving the full input type.
    expect(
      updateWith({ id: 2 }, { count: (x: number) => x + 1 })(input)
    ).type.toBe<{ id: number; count: number }[]>()

    // The patcher may hold a plain value, a function, a pipe or a key the
    // matcher lacks
    expect(updateWith({ id: 2 }, { count: 9 })(input)).type.toBe<
      { id: number; count: number }[]
    >()
    expect(
      updateWith(
        { id: 2 },
        { count: [(x: number) => x + 1, x => x * 2] }
      )(input)
    ).type.toBe<{ id: number; count: number }[]>()
  })

  test("updateWith - invalid input", () => {
    const input = [{ id: 1 }, { id: 2 }]

    expect(updateWith).type.not.toBeCallableWith(
      { id: "uuid" },
      { id: 1 },
      input
    )

    // A match value is never an array, m reads it as a pipe
    expect(updateWith).type.not.toBeCallableWith({ id: [1] }, { id: 2 }, input)

    expect(updateWith).type.not.toBeCallableWith({ id: 1 }, { tags: [] })

    expect(updateWith).type.not.toBeCallableWith({ id: 1 }, { tags: ["a"] })

    {
      const withTags: { tags: string[] }[] = [{ tags: [] }]

      // A patcher value is never an array either
      expect(updateWith).type.not.toBeCallableWith(
        { tags: () => true },
        { tags: ["x"] },
        withTags
      )
    }
  })
})
