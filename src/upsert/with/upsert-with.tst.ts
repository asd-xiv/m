import { expect, test, describe } from "tstyche"

import { upsertWith } from "./upsert-with.js"

describe("upsertWith", () => {
  test("upsertWith - uncurried", () => {
    const input = [{ id: 1, name: "a" }]

    expect(upsertWith({ id: 2 }, { id: 2, name: "new" }, input)).type.toBe<
      { id: number; name: string }[]
    >()
  })

  test("upsertWith - readonly input", () => {
    const input: readonly { id: number; name: string }[] = [
      { id: 1, name: "a" },
    ]

    // The input may be readonly, the result is a mutable array
    expect(upsertWith({ id: 1 }, { id: 1, name: "b" }, input)).type.toBe<
      { id: number; name: string }[]
    >()

    expect(upsertWith({ id: 1 }, { id: 1, name: "b" })(input)).type.toBe<
      { id: number; name: string }[]
    >()
  })

  test("upsertWith - curried", () => {
    const item = { id: 1, name: "updated" }

    expect(upsertWith({ id: 1 }, item)).type.toBe<
      (input: readonly { id: number; name: string }[]) => {
        id: number
        name: string
      }[]
    >()
  })

  test("upsertWith - invalid input", () => {
    const input = [{ id: 1, name: "a" }]

    // @ts-expect-error Object literal may only specify known properties, and 'missing' does not exist in type 'Matcher<{ id: number; name: string; }>'.
    upsertWith({ missing: 1 }, { id: 1, name: "b" }, input)

    // An item is a full T, a missing key is an error
    // @ts-expect-error Property 'name' is missing in type '{ id: number; }' but required in type '{ id: number; name: string; }'.
    upsertWith({ id: 1 }, { id: 1 }, input)

    // A match value is never an array, m reads it as a pipe
    // @ts-expect-error Type '[number]' is not assignable to type 'KeyMatcher<number> | undefined'.
    upsertWith({ id: [1] }, { id: 1, name: "b" }, input)
  })
})
