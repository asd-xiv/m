import test from "tape"

import { mapMatrix } from "./map-matrix.js"

const square = (x: number): number => x * x

test("mapMatrix - uncurried", t => {
  t.deepEqual(
    mapMatrix(square, [
      [1, 2],
      [3, 4],
    ]),
    [
      [1, 4],
      [9, 16],
    ],
    "given [a transform fn and a matrix] should [return a new matrix with transformed elements]"
  )

  t.deepEqual(
    mapMatrix([square, (x: number) => x + 1], [[1, 2]]),
    [[2, 5]],
    "given [a pipe array of fns] should [compose and apply to each element]"
  )

  t.deepEqual(
    mapMatrix(
      (value: number, rowIndex: number, columnIndex: number) =>
        `${String(value)}:${String(rowIndex)}:${String(columnIndex)}`,
      [[10, 20]]
    ),
    [["10:0:0", "20:0:1"]],
    "given [a callback with (value, row, col, matrix)] should [pass correct arguments]"
  )

  {
    const world: readonly (readonly number[])[] = [[1], [2]]

    t.deepEqual(
      mapMatrix(square, world),
      [[1], [4]],
      "given [a readonly matrix] should [return a new matrix]"
    )
  }

  {
    const matrix = [[7, 8]]
    let received: unknown

    mapMatrix((cell: number, _row: number, _column: number, all: unknown) => {
      received = all

      return cell
    }, matrix)

    t.equal(
      received,
      matrix,
      "given [a callback] should [pass the input matrix as 4th argument]"
    )
  }

  t.end()
})

test("mapMatrix - curried", t => {
  t.deepEqual(
    mapMatrix(square)([
      [1, 2],
      [3, 4],
    ]),
    [
      [1, 4],
      [9, 16],
    ],
    "given [a transform fn] should [return a new matrix with transformed elements]"
  )

  t.end()
})

test("mapMatrix - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      mapMatrix(42, [[1, 2]])
    },
    /expected 'fn' to be 'Function' or 'Array', got 'Number'/,
    "given [a number as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      mapMatrix(square, [[1, 2], 3])
    },
    /expected 'row' to be 'Array', got 'Number'/,
    "given [a matrix with a non-array row] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing invalid input
      mapMatrix(square, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing invalid input
      mapMatrix(square)(42)
    },
    /expected 'input' to be 'Array', got 'Number'/,
    "given [a number as input to curried form] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing invalid input
      mapMatrix(square, null)
    },
    /expected 'input' to be 'Array', got 'Null'/,
    "given [null as input] should [throw TypeError]"
  )

  t.end()
})
