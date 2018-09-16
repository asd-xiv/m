/**
 * Determines if one object's properties are equal to another
 *
 * @tag Core
 * @signature (subset: Object)(source: Object): boolean
 *
 * @param  {Object}   subset  Set of properties that should match
 * @param  {Object}   source  Object matching against
 *
 * @return {boolean}  True if all "subset" properties are of equal (shallow
 *                    compare) value to properties in "source" object,
 *                    otherwise false
 *
 * @example
 *
 * isMatch({
 *  id: 2,
 *  parentId: null,
 * })({
 *  id: 2,
 *  parentId: null
 *  name: "John",
 * })
 * // true
 *
 * isMatch({
 *  "!parentId": null,
 *  "name": "John",
 * })({
 *  id: 2,
 *  parentId: null,
 *  name: "John",
 * })
 * // false
 */
module.exports = subset => source => {
  const subsetEntries = Object.entries( subset )

  for ( let i = 0, length = subsetEntries.length; i < length; i++ ) {
    const [ key, value ] = subsetEntries[ i ]
    const shouldTestNegation = key[ 0 ] === "!"
    const cleanKey = key.replace( "!", "" )
    const isFieldMatch = shouldTestNegation
      ? source[ cleanKey ] !== value
      : source[ cleanKey ] === value

    if ( isFieldMatch === false ) {
      return false
    }
  }

  return true
}
