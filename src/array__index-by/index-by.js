/**
 * Group an array of objects by field. Only truthy fields will be indexed.
 *
 * @param  {string}  field  The field to index by
 * @param  {Array}   array  Input
 *
 * @return {Object}
 *
 * @example
 * indexBy( "user_id" )( [
 *   { id: 1, user_id: 2 },
 *   { id: 2, user_id: 3 },
 *   { id: 3, user_id: 2 },
 *   { id: 4, user_id: null },
 * ] )
 * // => {
 * //   2: [ { id: 1, user_id: 2 }, { id: 3, user_id: 2 } ],
 * //   3: [ { id: 2, user_id: 3 } ],
 * // }
 */
module.exports = field => input => {
  const result = {}

  for ( let i = 0, length = input.length; i < length; i++ ) {
    if ( !!input[ i ][ field ] ) {
      const groupKey = String( input[ i ][ field ] )

      result[ groupKey ] = result[ groupKey ]
        ? [ ...result[ groupKey ], input[ i ] ]
        : [ input[ i ] ]
    }
  }

  return result
}
