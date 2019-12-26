import test from "tape"
import { groupBy } from ".."

test("groupBy", t => {
  const comments = [
    { id: 1, user_id: 2 },
    { id: 2, user_id: 3 },
    { id: 3, user_id: 2 },
    { id: 4, user_id: null },
  ]
  const commentsByUserId = groupBy("user_id")(comments)

  t.deepEqual(
    commentsByUserId,
    [
      [
        { id: 1, user_id: 2 },
        { id: 3, user_id: 2 },
      ],
      [{ id: 2, user_id: 3 }],
      [{ id: 4, user_id: null }],
    ],
    "Grouping array of objects by field returns array of arrays"
  )

  t.equal(
    commentsByUserId[1][0],
    comments[1],
    "Items arent cloned after grouping"
  )

  t.end()
})
