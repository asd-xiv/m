const test = require( "tape" )
const indexBy = require( "./index-by" )

/**
 * Group an array of objects by field. Only truthy fields will be indexed.
 *
 * @param  {string}  field  The field to index by
 * @param  {Array}   array  Input
 *
 * @return {Object}
 */
test( "array::indexBy ( field: string )( input: Array[mixed] ): Object", t => {
  const comments = [
    { id: 1, user_id: 2 },
    { id: 2, user_id: 3 },
    { id: 3, user_id: 2 },
    { id: 4, user_id: null },
  ]
  const commentsByUserId = indexBy( "user_id" )( comments )

  t.equal(
    Object.entries( commentsByUserId ).length,
    2,
    "distinct user_ids should be 2" )
  t.equal(
    commentsByUserId[ 2 ].length,
    2,
    "comments with user_id:2 should be 2" )
  t.deepEqual(
    commentsByUserId[ 3 ][ 0 ],
    comments[ 1 ],
    "first comment with user_id:3 should equal source array one" )
  t.notOk(
    commentsByUserId[ 4 ],
    "comments with user_id:4 should not exist" )

  t.end()
} )
