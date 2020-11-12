/**
 * Shallow clone of an object, setting or overriding a property with the given
 * value
 *
 * @param {string} key    Property name
 * @param {mixed}  value  Property value
 * @param {object} source Source object
 *
 * @returns {object}
 *
 * @name write
 * @tag Object
 * @signature ( key: string, value: mixed ) => ( source: Object ): Object
 *
 * @example
 * write( "a", "lorem" )( { b: "ipsum" } )
 * // => { a: "lorem", b: "ipsum" }
 */
const write = (key, value) => source => ({
  ...source,
  [key]: value,
})

export { write }
