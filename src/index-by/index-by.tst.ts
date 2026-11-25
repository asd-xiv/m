import { expect, test, describe } from "tstyche"

import { indexBy } from "./index-by.js"

type Item = { id: number; name: string }

describe("indexBy", () => {
  test("indexBy - uncurried", () => {
    const items: Item[] = []
    const result = indexBy((item: Item) => item.id, items)

    expect(result).type.toBe<Record<string, Item>>()

    {
      const readonlyItems: readonly Item[] = items

      expect(indexBy((item: Item) => item.id, readonlyItems)).type.toBe<
        Record<string, Item>
      >()
    }
  })

  test("indexBy - curried", () => {
    const fn = indexBy((item: Item) => item.id)

    expect(fn).type.toBe<(input: readonly Item[]) => Record<string, Item>>()
  })

  test("indexBy - a key that is not a string or a number", () => {
    const items: Item[] = []

    expect(indexBy([(item: Item) => item.id > 1, String], items)).type.toBe<
      Record<string, Item>
    >()
    // @ts-expect-error No overload matches this call.
    indexBy((item: Item) => item.id > 1, items)
  })

  test("indexBy - invalid input", () => {
    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'readonly Item[]'.
    indexBy((item: Item) => item.id, "not-an-array")
  })
})
