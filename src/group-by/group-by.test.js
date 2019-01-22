const test = require("tape")
const groupBy = require("./group-by")

/**
 * Group an array of objects by field. Only truthy fields will be indexed.
 *
 * @param  {string}  field  The field to index by
 * @param  {Array}   array  Input
 *
 * @return {Object}
 *
 * @example
 * groupBy("user_id")([
 *   {id: 1, user_id: 2},
 *   {id: 2, user_id: 3},
 *   {id: 3, user_id: 2},
 *   {id: 4, user_id: null},
 * ] )
 * // => {
 * //   2: [{id: 1, user_id: 2}, {id: 3, user_id: 2}],
 * //   3: [{id: 2, user_id: 3}],
 * // }
 */
test("array::groupBy", t => {
  const comments = [
    { id: 1, user_id: 2 },
    { id: 2, user_id: 3 },
    { id: 3, user_id: 2 },
    { id: 4, user_id: null },
  ]
  const commentsByUserId = groupBy("user_id")(comments)

  t.deepEqual(
    commentsByUserId,
    {
      2: [{ id: 1, user_id: 2 }, { id: 3, user_id: 2 }],
      3: [{ id: 2, user_id: 3 }],
    },
    "array of objects should return an object groped by user_id"
  )

  t.equal(
    commentsByUserId[3][0],
    comments[1],
    "first comment with user_id:3 should equal source array one"
  )

  t.end()
})
