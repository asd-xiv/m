import test from "tape"
import { isEmpty } from "../is-empty/is-empty"
import { read } from "../read/read"
import { remove, removeWith } from ".."

test("remove(With)", t => {
  t.deepEqual(
    remove(_ => _ === 3)([1, 2, 3]),
    [1, 2],
    "Remove existing element from array by match function"
  )

  t.deepEqual(
    remove(3, [1, 2, 3]),
    [1, 2],
    "Remove existing element from array by value"
  )

  t.deepEqual(
    remove(
      [read("comments"), isEmpty],
      [{ id: 1 }, { id: 2, comments: [{ id: 1 }] }]
    ),
    [{ id: 2, comments: [{ id: 1 }] }],
    "Remove existing element from array of objects using predicate pipeline"
  )

  t.deepEqual(
    removeWith({ author: null })([
      { id: 1, author: null },
      { id: 2, author: null },
      { id: 3, author: 3 },
    ]),
    [{ id: 3, author: 3 }],
    "Remove multiple elements from array by matching a subset (curried)"
  )

  t.deepEqual(
    removeWith({ author: null }, [
      { id: 1, author: null },
      { id: 2, author: null },
      { id: 3, author: 3 },
    ]),
    [{ id: 3, author: 3 }],
    "Remove multiple elements from array by matching a subset (uncurried)"
  )

  const source = [1, 2, 3]

  t.notEqual(remove(3)(source), source, "Imutable")

  t.end()
})
