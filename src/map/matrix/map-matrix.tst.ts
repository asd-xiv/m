import { expect, test, describe } from "tstyche"

import { mapMatrix } from "./map-matrix.js"

const double = (input: number): number => input * 2

describe("mapMatrix", () => {
  test("mapMatrix - uncurried", () => {
    const input = [
      [1, 2],
      [3, 4],
    ]

    expect(
      mapMatrix((item, rowIndex, columnIndex, matrix) => {
        expect(item).type.toBe<number>()
        expect(rowIndex).type.toBe<number>()
        expect(columnIndex).type.toBe<number>()
        expect(matrix).type.toBe<readonly (readonly number[])[]>()

        return item * 2
      }, input)
    ).type.toBe<number[][]>()
  })

  test("mapMatrix - readonly input", () => {
    const input: readonly (readonly number[])[] = [
      [1, 2],
      [3, 4],
    ]

    expect(mapMatrix(double, input)).type.toBe<number[][]>()
  })

  test("mapMatrix - curried", () => {
    const input = [
      [1, 2],
      [3, 4],
    ]

    expect(
      mapMatrix((item, _rowIndex, _columnIndex, _matrix) => {
        expect(item).type.toBe<unknown>()

        return (item as number) * 2
      })(input)
    ).type.toBe<number[][]>()

    expect(mapMatrix(double)(input)).type.toBe<number[][]>()
  })

  test("mapMatrix - invalid input", () => {
    const input = [
      [1, "2"],
      [3, 4],
    ]

    // @ts-expect-error Type 'string' is not assignable to type 'number'.
    mapMatrix(double, input)
  })
})
