import test from "tape"
import { is } from "../is/is"
import { partition, partitionWith } from ".."

test("array::partition", t => {
  const equalsTwo = x => x === 2

  t.deepEqual(
    partition(equalsTwo)([2, 2, 1, 1, 2]),
    [[2, 2, 2], [1, 1]],
    "(equalsTwo)([2,2,1,1,2]) // => [[2,2,2],[1,1]]"
  )

  t.deepEqual(
    partition(equalsTwo)([1]),
    [[], [1]],
    "(equalsTwo)([1]) // => [[], [1]]"
  )

  t.deepEqual(
    partitionWith({
      parentId: is,
    })([{ id: 1 }, { id: 2, parentId: 1 }]),
    [[{ id: 2, parentId: 1 }], [{ id: 1 }]],
    "partitionWith({parentId: is}) // => [[{parentId: 1}], [{id: 1}]]"
  )

  t.end()
})
