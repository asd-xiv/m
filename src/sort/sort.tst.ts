import { expect, test, describe } from "tstyche"

import { sort } from "./sort.js"

describe("sort", () => {
  test("sort - uncurried", () => {
    const nums = [3, 1, 2]
    const strs = ["c", "a", "b"]

    expect(sort(nums)).type.toBe<number[]>()
    expect(sort("desc", nums)).type.toBe<number[]>()
    expect(sort("asc", strs)).type.toBe<string[]>()

    {
      const readonlyNums: readonly number[] = [3, 1, 2]

      expect(sort(readonlyNums)).type.toBe<number[]>()
    }
  })

  test("sort - curried", () => {
    const nums = [3, 1, 2]
    const strs = ["c", "a", "b"]
    const sortDesc = sort("desc")

    expect(sortDesc(nums)).type.toBe<number[]>()
    expect(sortDesc(strs)).type.toBe<string[]>()
  })

  test("sort - invalid input", () => {
    // @ts-expect-error Argument of type '"up"' is not assignable to parameter of type 'SortDirection'
    sort("up", [1, 2, 3])
  })
})
