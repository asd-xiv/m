/**
 * Shallow clone of an object, setting or overriding a property with the given
 * value
 *
 * @param      {string}  key     Property name
 * @param      {mixed}   value   Property value
 * @param      {Object}  source  Source object
 *
 * @return     {Object}
 *
 * @tag Object
 * @signature ( key: string, value: mixed ) => ( source: Object ): Object
 *
 * @example
 * set( "a", "lorem" )( { b: "ipsum" } )
 * // => { a: "lorem", b: "ipsum" }
 */
const set = (key, value) => source => ({
  ...source,
  [key]: value,
})

export { set }
