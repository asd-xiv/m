import { describe, expect, test } from "tstyche"

import { evolve } from "./evolve.js"

describe("evolve", () => {
  test("evolve - uncurried", () => {
    const input = { id: 1, name: "foo" }

    expect(
      evolve(
        {
          name: (value, source) => {
            expect(value).type.toBe<string>()
            expect(source).type.toBe<{ id: number; name: string }>()

            return `${value}-${source.id}`
          },
        },
        input
      )
    ).type.toBe<{ id: number; name: string }>()

    // A function that returns another type changes the type of its key
    expect(evolve({ name: value => value.length }, input)).type.toBe<{
      id: number
      name: number
    }>()

    // A pipe array takes the type of its last function
    expect(
      evolve({ name: [value => value.length, length => length > 3] }, input)
    ).type.toBe<{ id: number; name: boolean }>()

    // Set an array with a function, an array literal reads as a pipe
    expect(evolve({ id: () => ["x"] }, input)).type.toBe<{
      id: string[]
      name: string
    }>()
  })

  test("evolve - curried", () => {
    const input = { count: 1, label: "test" }
    const inc = (x: number) => x + 1

    expect(evolve({ count: inc })(input)).type.toBe<{
      count: number
      label: string
    }>()

    {
      // you only need to type the 1st function in the pipe chain, the rest
      // will get inferred
      const toLength = (value: string) => value.length
      const evolved = evolve({ label: [toLength, length => length > 3] })(input)

      expect(evolved).type.toBe<{ count: number; label: boolean }>()
    }
  })

  test("evolve - invalid input", () => {
    const input = { id: 1, name: "foo" }

    expect(evolve).type.not.toBeCallableWith({ name: "bar" }, input)

    expect(evolve).type.not.toBeCallableWith({ name: ["bar"] }, input)

    expect(evolve).type.not.toBeCallableWith({ notAKey: () => "x" }, input)
  })
})
