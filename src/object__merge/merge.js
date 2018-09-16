/**
 * Combine from left to right, 2 or more objects into a new single one.
 * Properties will be shallow copied. Those with the same name will be
 * overwriten by right most object.
 *
 * @tag Object
 * @signature ( ...source: Object[] ): Object
 *
 * @param   {Object[]}  source  Array of objects
 *
 * @return  {Object}
 *
 * @example
 * merge({a: "lorem"}, {b: "ipsum", c: 41}, {c: 42, b: undefined})
 * // => { a: "lorem", b: "ipsum", c: 42 }
 */
module.exports = ( ...sources ) => {
  const result = {}

  for ( let i = 0, length = sources.length; i < length; i++ ) {
    const sourceEntries = Object.entries( sources[ i ] )

    for ( let j = 0, sourceEntriesLength = sourceEntries.length; j < sourceEntriesLength; j++ ) {
      const [ key, value ] = sourceEntries[ j ]

      if ( value !== undefined ) {
        result[ key ] = value
      }
    }
  }

  return result
}

