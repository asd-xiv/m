/**
 * Shallow clone of an object, setting or overriding a property with the given
 * value
 *
 * @param {string} key
 * @param {any}    value
 * @param {Object} input
 *
 * @returns {Object}
 *
 * @name write
 * @tag Object
 * @signature (key: string, value: any) => (input: Object): Object
 *
 * @example
 * write( "a", "lorem" )( { b: "ipsum" } )
 * // => { a: "lorem", b: "ipsum" }
 */
const write = (key, value) => input => ({
  ...input,
  [key]: value,
})

export { write }
