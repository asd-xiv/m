/**
 * Check if an object has a key defined
 *
 * @param  {string}  key    Property name
 * @param  {object}  input  Test object
 *
 * @return {boolean}
 *
 * @tag Object
 * @signature ( key: string ) => ( input: Object ): boolean
 *
 * @example
 * has( "lorem" )( { lorem: null } ) // => true
 * has( "toString" )( { lorem: "ipsum" } ) // => false
 */
module.exports = key => input =>
  Object.prototype.hasOwnProperty.call( input, key )
