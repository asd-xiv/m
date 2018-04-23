const { is } = require( "../type/type" )

/**
 * Transform array into a indexed object
 *
 * @param  {string}  field  The field to index by
 * @param  {Array}   array  Input
 *
 * @return {Object}
 */
const indexBy = field => array => {
  const result = {}

  for ( let i = 0, length = array.length; i < length; i++ ) {
    if ( is( array[ i ][ field ] ) ) {
      result[ array[ i ][ field ] ] = array[ i ]
    }
  }

  return result
}

module.exports = {
  indexBy,
}
