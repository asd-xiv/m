import { expect, test, describe } from "tstyche"

import { groupBy } from "./group-by.js"
import { read } from "../read/read.js"

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

  test("groupBy - a number key", () => {
    const items: Item[] = []

    expect(groupBy((item: Item) => item.name.length, items)).type.toBe<
      Record<string, Item[]>
    >()
    expect(groupBy(read("level"), [{ level: 1 }])).type.toBe<
      Record<string, { level: number }[]>
    >()
  })

  test("groupBy - a key that is not a string or a number", () => {
    const users = [{ name: "alice", active: true }]

    // To split by a boolean, `partition(read("active"))` is the intended
    // tool: it returns both groups as a pair, `[pass, fail]`
    expect(groupBy([read("active"), String], users)).type.toBe<
      Record<string, { name: string; active: boolean }[]>
    >()
    // @ts-expect-error No overload matches this call.
    groupBy(read("active"), users)
  })
})
