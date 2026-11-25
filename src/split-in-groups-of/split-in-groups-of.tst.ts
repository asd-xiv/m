import { expect, test, describe } from "tstyche"

import { splitInGroupsOf } from "./split-in-groups-of.js"

describe("splitInGroupsOf", () => {
  test("splitInGroupsOf - uncurried", () => {
    expect(splitInGroupsOf(2, [1, 2, 3, 4])).type.toBe<number[][]>()
    expect(splitInGroupsOf(2, ["a", "b"])).type.toBe<string[][]>()
    const readonlyInput: readonly number[] = [1, 2, 3]

    expect(splitInGroupsOf(2, readonlyInput)).type.toBe<number[][]>()
    expect(splitInGroupsOf(3, [{ id: 1 }])).type.toBe<{ id: number }[][]>()
  })

  test("splitInGroupsOf - curried", () => {
    const byTwo = splitInGroupsOf(2)

    expect(byTwo([1, 2, 3, 4])).type.toBe<number[][]>()
    expect(byTwo(["a", "b"])).type.toBe<string[][]>()
    expect(splitInGroupsOf(2)([{ id: 1 }])).type.toBe<{ id: number }[][]>()
  })

  test("splitInGroupsOf - invalid input", () => {
    // @ts-expect-error Argument of type ... is not assignable to parameter of type 'number'.
    splitInGroupsOf("2", [1, 2])

    // @ts-expect-error Argument of type ... is not assignable to parameter of type ...
    splitInGroupsOf(2, "not-array")
  })
})
