import test from "tape"
import { mapMatrix } from ".."

test("mapMatrix", t => {
  const square = value => value * value

  t.deepEqual(
    mapMatrix(square)([
      [1, 2],
      [3, 4],
    ]),
    [
      [1, 4],
      [9, 16],
    ],
    "Curried (square)([[1, 2], [3, 4]]) // => [[1, 4], [9, 16]]"
  )

  t.deepEqual(
    mapMatrix(square, [
      [1, 2],
      [3, 4],
    ]),
    [
      [1, 4],
      [9, 16],
    ],
    "Uncurried (square, [[1, 2], [3, 4]]) // => [[1, 4], [9, 16]]"
  )

  const inc = x => x + 1

  t.deepEqual(
    mapMatrix(
      [square, inc],
      [
        [1, 2],
        [3, 4],
      ]
    ),
    [
      [2, 5],
      [10, 17],
    ],
    "Multiple transform functions ([square, inc], [[1, 2], [3, 4]]) // => [[2, 5], [10, 17]]"
  )
  t.end()
})
