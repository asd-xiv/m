/* eslint-disable unicorn/no-null */

import test from "tape"

import { groupBy } from "./group-by"

test("groupBy", t => {
  const comments = [
    { id: 1, user_id: 2 },
    { id: 2, user_id: 3 },
    { id: 3 },
    { id: 4, user_id: null },
    { id: 5, user_id: undefined },
  ]

  t.deepEqual(
    groupBy("user_id")(comments),
    [
      [{ id: 1, user_id: 2 }],
      [{ id: 2, user_id: 3 }],
      [{ id: 3 }, { id: 5, user_id: undefined }],
      [{ id: 4, user_id: null }],
    ],
    "Grouping array of objects by field returns array of arrays"
  )

  t.deepEqual(
    groupBy("user_id", comments),
    [
      [{ id: 1, user_id: 2 }],
      [{ id: 2, user_id: 3 }],
      [{ id: 3 }, { id: 5, user_id: undefined }],
      [{ id: 4, user_id: null }],
    ],
    "Grouping array of objects by field returns array of arrays"
  )

  t.end()
})
