import test from "tape"

import { is } from "../is/is.js"
import { read } from "../read/read.js"
import { partition, partitionWith } from "./partition.js"

const equalsTwo = x => x === 2

test("partition", t => {
  t.deepEqual(
    partition(equalsTwo)([2, 2, 1, 1, 2]),
    [
      [2, 2, 2],
      [1, 1],
    ],
    "(equalsTwo)([2,2,1,1,2]) // => [[2,2,2],[1,1]]"
  )

  t.deepEqual(
    partition(equalsTwo, [2, 2, 1, 1, 2]),
    [
      [2, 2, 2],
      [1, 1],
    ],
    "(equalsTwo, [2,2,1,1,2]) // => [[2,2,2],[1,1]]"
  )

  t.deepEqual(
    partition([read("comments"), is], [{ id: 1, comments: [] }, { id: 2 }]),
    [[{ id: 1, comments: [] }], [{ id: 2 }]],
    "(equalsTwo, [2,2,1,1,2]) // => [[2,2,2],[1,1]]"
  )

  t.deepEqual(
    partition(equalsTwo)([1]),
    [[], [1]],
    "(equalsTwo)([1]) // => [[], [1]]"
  )

  t.end()
})

test("partitionWith", t => {
  t.deepEqual(
    partitionWith({
      parentId: is,
    })([{ id: 1 }, { id: 2, parentId: 1 }]),
    [[{ id: 2, parentId: 1 }], [{ id: 1 }]],
    "partitionWith({parentId: is}) // => [[{parentId: 1}], [{id: 1}]]"
  )

  t.end()
})
