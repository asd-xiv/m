/**
 * Create or modify a property on a object. Create a shallow copy of the
 * source object
 *
 * @param      {string}  prop    Property name
 * @param      {mixed}   value   Property value
 * @param      {Object}  source  Source object
 *
 * @return     {Object}
 *
 * @tag Object
 * @signature ( prop: string, value: mixed ) => ( source: Object ): Object
 *
 * @example
 * set( "a", "lorem" )( { b: "ipsum" } )
 * // => { a: "lorem", b: "ipsum" }
 */
module.exports = ( prop, value ) => source => ( {
  ...source,
  [ prop ]: value,
} )
