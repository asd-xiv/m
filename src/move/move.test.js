import test from "tape"

import { move } from "./move.js"

test("move", t => {
  t.deepEqual(
    move(0, 1, [1, 2]),
    [2, 1],
    "Move element from and to valid positions (uncurried)"
  )

  t.deepEqual(
    move(0, 1, [{ id: 1 }, { id: 2 }]),
    [{ id: 2 }, { id: 1 }],
    "Move element from and to valid positions (curried)"
  )

  t.deepEqual(
    move(0, 100, [1, 2, 3, 4]),
    [2, 3, 4, 1],
    "Move element from valid position to out-of-bounds should move it at end of array"
  )

  t.deepEqual(
    move(1, -1, [1, 2, 3, 4]),
    [1, 3, 4, 2],
    "Move element from valid position to negative position should move it at position starting from the end"
  )

  t.deepEqual(
    move(-1, 0, [1, 2, 3, 4]),
    [4, 1, 2, 3],
    "Move element from negative position to valid position"
  )

  t.end()
})
