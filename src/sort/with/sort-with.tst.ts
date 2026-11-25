import { expect, test, describe } from "tstyche"

import { sortWith } from "./sort-with.js"

type Item = {
  id: number
  position: number
  isActive: boolean
  createdAt: string
}

describe("sortWith", () => {
  test("sortWith - uncurried", () => {
    const input: Item[] = [
      { id: 1, position: 3, isActive: true, createdAt: "2020-01-01" },
      { id: 2, position: 1, isActive: false, createdAt: "2020-01-02" },
    ]

    expect(sortWith({ position: "asc", isActive: "desc" }, input)).type.toBe<
      Item[]
    >()

    expect(
      sortWith(
        {
          createdAt: (a: string, b: string) =>
            new Date(a).getTime() - new Date(b).getTime(),
        },
        input
      )
    ).type.toBe<Item[]>()

    expect(
      sortWith(
        {
          createdAt: [(v: string) => new Date(v).getTime(), "desc"],
        },
        input
      )
    ).type.toBe<Item[]>()
  })

  test("sortWith - curried", () => {
    const input: Item[] = [
      { id: 1, position: 3, isActive: true, createdAt: "2020-01-01" },
    ]
    const sortByPosition = sortWith({ position: "asc" })

    expect(sortByPosition(input)).type.toBe<Item[]>()

    {
      // items whose sort keys are optional need no type argument
      type User = { name?: string | null }
      const users: User[] = [{ name: "b" }, {}]

      expect(sortWith({ name: "asc" })(users)).type.toBe<User[]>()
    }
  })

  test("sortWith - readonly input", () => {
    const input: readonly Item[] = []

    expect(sortWith({ position: "asc" }, input)).type.toBe<Item[]>()
  })

  test("sortWith - invalid input", () => {
    // @ts-expect-error Type 'number' is not assignable to type 'FieldSorter<number> | undefined'
    sortWith({ position: 42 }, [] as Item[])
  })
})
