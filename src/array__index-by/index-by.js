/**
 * Group an array of objects by field. Only truthy fields will be indexed.
 *
 * @param  {string}  field  The field to index by
 * @param  {Array}   array  Input
 *
 * @return {Object}
 */
module.exports = field => array => {
  const result = {}

  for ( let i = 0, length = array.length; i < length; i++ ) {
    if ( !!array[ i ][ field ] ) {
      const groupKey = String( array[ i ][ field ] )

      result[ groupKey ] = result[ groupKey ]
        ? [ ...result[ groupKey ], array[ i ] ]
        : [ array[ i ] ]
    }
  }

  return result
}
