/**
 * Returns a new list by extracting the same named property off all objects in
 * the source list
 *
 * @param  {string}    field    Field name to extract values from
 * @param  {Object[]}  source   Array of objects
 *
 * @return {number}
 *
 * @tag Array
 * @signature ( field: string ) => ( source: Object[] ): mixed[]
 *
 * @example
 * pluck("position")([{id: 1, position: 3}, {id:2, position: -1}])
 * // => [3, -1]
 */
module.exports = field => source => {
  const result = []

  for ( let i = 0, length = source.length; i < length; i++ ) {
    result.push( source[ i ][ field ] )
  }

  return result
}
