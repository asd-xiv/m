import test from "tape"

import { intersect } from ".."

test("array::intersect", t => {
  t.deepEqual(
    intersect(
      (a, b) => a === b,
      a => a
    )([], [1, 2, 3]),
    [1, 2, 3],
    "First array empty"
  )

  t.deepEqual(
    intersect(
      (a, b) => a === b,
      a => a
    )([1, 2, 3], []),
    [1, 2, 3],
    "Second array empty"
  )

  t.deepEqual(
    intersect(
      (a, b) => a === b,
      a => a
    )([1, 2, 3], [3, 4, 5]),
    [1, 2, 3, 4, 5],
    "Join with common"
  )

  t.deepEqual(
    intersect(
      (a, b) => a === b,
      a => a
    )([1, 2], [3, 4, 5]),
    [1, 2, 3, 4, 5],
    "Join without common"
  )

  t.deepEqual(
    intersect(
      (a, b) => a.id === b.id,
      (a, b) => ({ ...a, ...b })
    )(
      [{ id: 1, overwrite: 1 }, { id: 2 }],
      [{ id: 1, overwrite: 2 }, { id: 3 }]
    ),
    [{ id: 1, overwrite: 2 }, { id: 2 }, { id: 3 }],
    "Join objects - same order as input arrays"
  )

  t.end()
})
