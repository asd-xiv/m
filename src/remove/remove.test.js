import test from "tape"
import { remove, removeWith } from ".."

test("remove(With)", t => {
  t.deepEqual(
    remove(_ => _ === 3)([1, 2, 3]),
    [1, 2],
    "Remove existing element from array by match function"
  )

  t.deepEqual(
    remove(3)([1, 2, 3]),
    [1, 2],
    "Remove existing element from array by value"
  )

  t.deepEqual(
    remove(1, 3)([1, 2, 3]),
    [2],
    "Remove multiple elements from array by value"
  )

  t.deepEqual(
    removeWith({ author: null })([
      { id: 1, author: null },
      { id: 2, author: null },
      { id: 3, author: 3 },
    ]),
    [{ id: 3, author: 3 }],
    "Remove multiple elements from array by matching a subset"
  )

  const source = [1, 2, 3]

  t.notEqual(remove(3)(source), source, "Imutable")

  t.end()
})
