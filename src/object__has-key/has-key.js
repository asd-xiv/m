/**
 * Check if property exists on a given object
 *
 * @param  {string}  key     Property name
 * @param  {object}  source  Source object
 *
 * @return {boolean}
 *
 * @tag Object
 * @signature ( key: string ) => ( source: Object ): boolean
 *
 * @example
 * has( "lorem" )( { lorem: null } ) // => true
 * has( "toString" )( { lorem: "ipsum" } ) // => false
 */
module.exports = key => source =>
  Object.prototype.hasOwnProperty.call( source, key )
