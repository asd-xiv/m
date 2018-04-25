/**
 * Check if input has objects with certain properties
 *
 * @param  {Object}   filters  The filters
 * @param  {Array}    input    Haystack
 *
 * @return {boolean}  True if has, False otherwise.
 *
 * @example
 *
 * hasWith( { id: 2 } )( [ { id: 2, title: "todo #1"} ] ) // true
 * hasWith( { id: 2 } )( [ { id: 3, title: "todo #2"} ] ) // false
 */
module.exports = filters => input => {
  const filterEntries = Object.entries( filters )

  for ( let i = 0, length = filterEntries.length; i < length; i++ ) {
    const [ key, value ] = filterEntries[ i ]

    if ( !input.some( element => element[ key ] === value ) ) {
      return false
    }
  }

  return true
}
