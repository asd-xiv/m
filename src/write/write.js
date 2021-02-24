/**
 * Shallow clone of an object, setting or overriding a property with the given
 * value
 *
 * @param {string} key
 * @param {any}    value
 * @param {Object} source
 *
 * @returns {Object}
 *
 * @name write
 * @tag Object
 * @signature (key: string, value: any) => (source: Object): Object
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
