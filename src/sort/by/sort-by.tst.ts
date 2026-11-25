import { expect, test, describe } from "tstyche"

import { sortBy } from "./sort-by.js"

describe("sortBy", () => {
  test("sortBy - uncurried", () => {
    const input = [{ id: 2 }, { id: 1 }]

    expect(
      sortBy((a, b) => {
        expect(a).type.toBe<{ id: number }>()
        expect(b).type.toBe<{ id: number }>()

        return a.id - b.id
      }, input)
    ).type.toBe<{ id: number }[]>()
  })

  test("sortBy - curried", () => {
    const compareFn = (a: { id: number }, b: { id: number }) => a.id - b.id
    const sortById = sortBy(compareFn)

    expect(
      sortById([
        { id: 2, name: "b" },
        { id: 1, name: "a" },
      ])
    ).type.toBe<{ id: number; name: string }[]>()
  })

  test("sortBy - invalid input", () => {
    const compareFn = (a: number, b: number) => a - b

    // @ts-expect-error Type 'string' is not assignable to type 'number'
    sortBy(compareFn, ["a"])
  })
})
