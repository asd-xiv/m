import { expect, test, describe } from "tstyche"

import { groupBy } from "./group-by.js"

type Item = { name: string; role: string }

describe("groupBy", () => {
  test("groupBy - uncurried", () => {
    const items: Item[] = []
    const result = groupBy((item: Item) => item.role, items)

    expect(result).type.toBe<Record<string, Item[]>>()

    {
      const readonlyItems: readonly Item[] = items

      expect(groupBy((item: Item) => item.role, readonlyItems)).type.toBe<
        Record<string, Item[]>
      >()
    }
  })

  test("groupBy - curried", () => {
    const fn = groupBy((item: Item) => item.role)

    expect(fn).type.toBe<(input: readonly Item[]) => Record<string, Item[]>>()
  })

  test("groupBy - invalid input", () => {
    const items: Item[] = []

    // @ts-expect-error Type 'number' is not assignable to type 'string'.
    groupBy((item: Item) => item.name.length, items)
  })
})
