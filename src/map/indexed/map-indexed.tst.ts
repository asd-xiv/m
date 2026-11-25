import { describe, expect, test } from "tstyche"

import { mapIndexed } from "./map-indexed.js"

describe("mapIndexed", () => {
  test("mapIndexed - uncurried", () => {
    expect(mapIndexed((x, i) => x * i, [1, 2])).type.toBe<number[]>()

    expect(
      mapIndexed((x, i, all) => `${x}${i}${all.length}`, [1, 2])
    ).type.toBe<string[]>()

    expect(
      mapIndexed([(x: number) => String(x), s => s.length], [1, 2])
    ).type.toBe<number[]>()
  })

  test("mapIndexed - curried", () => {
    const addIndex = (x: number, i: number) => x + i

    expect(mapIndexed(addIndex)([1, 2])).type.toBe<number[]>()
    expect(mapIndexed(addIndex)([1, 2] as const)).type.toBe<number[]>()
  })

  test("mapIndexed - invalid input", () => {
    // @ts-expect-error Type 'string' is not assignable to type 'number'.
    mapIndexed((x: number, i: number) => x + i, [1, "2"])

    // @ts-expect-error Type 'string' is not assignable to type 'number'.
    mapIndexed((x: number, i: number) => x + i)([1, "2"])
  })
})
