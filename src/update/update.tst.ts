import { describe, expect, test } from "tstyche"

import { update } from "./update.ts"

describe("update", () => {
  test("update - uncurried", () => {
    const input = { id: 1, name: "foo" }

    expect(update({ name: "bar" }, input)).type.toBe<{
      id: number
      name: string
    }>()

    expect(
      update(
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

    // A pipe array keeps the type of its key
    expect(
      update(
        {
          name: [
            (value: string) => value.trim(),
            (value: string) => value.toUpperCase(),
          ],
        },
        input
      )
    ).type.toBe<{ id: number; name: string }>()

    // Set an array with a function, an array literal reads as a pipe
    {
      const withTags: { id: number; tags: string[] } = { id: 1, tags: [] }

      expect(update({ tags: () => ["x"] }, withTags)).type.toBe<{
        id: number
        tags: string[]
      }>()
    }

    // It can set a missing optional key
    {
      const withNote: { id: number; note?: string } = { id: 1 }

      expect(update({ note: "added" }, withNote)).type.toBe<{
        id: number
        note?: string
      }>()
    }
  })

  test("update - curried", () => {
    const input = { count: 1, label: "test" }
    const inc = (x: number) => x + 1

    expect(update({ count: inc })(input)).type.toBe<{
      count: number
      label: string
    }>()
  })

  test("update - invalid input", () => {
    const input = { id: 1, name: "foo" }

    // @ts-expect-error Type 'number' is not assignable to type 'string'.
    update({ name: () => 42 }, input)

    // @ts-expect-error Type 'number' is not assignable to type 'KeyPatcher<string, { id: number; name: string; }> | undefined'.
    update({ name: 42 }, input)

    // @ts-expect-error Object literal may only specify known properties, and 'notAKey' does not exist in type 'Patcher<{ id: number; name: string; }>'.
    update({ notAKey: "x" }, input)

    // A plain value is never an array: m reads an array as a pipe
    {
      const withTags: { tags: string[] } = { tags: [] }

      // @ts-expect-error Type '[string]' is not assignable to type 'KeyPatcher<string[], { tags: string[]; }> | undefined'.
      update({ tags: ["x"] }, withTags)
    }
  })
})
