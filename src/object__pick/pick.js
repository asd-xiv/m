/**
 * Returns a partial copy of an object containing only the keys specified.
 * If the key does not exist, the property is ignored.
 *
 * @tag Object
 * @signature ( keys: Array[string] ) => ( source: Object ): Object
 *
 * @param      {Array<string>}  keys   The properties to be filtered out
 * @param      {Object}         source  The source object
 *
 * @return     {Object}
 */
module.exports = keys => source => {
  const result = {}

  for ( let i = 0, length = keys.length; i < length; i++ ) {
    const key = keys[ i ]
    const value = source[ key ]

    if ( Object.hasOwnProperty.call( source, key ) ) {
      result[ key ] = value
    }
  }

  return result
}
