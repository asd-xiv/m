/**
 * Get value from obj property
 *
 * @param  {string}  key     Property name
 * @param  {object}  source  Source object
 *
 * @return {mixed}
 *
 * @tag Object
 * @signature ( key: string ) => ( source: Object ): mixed
 *
 * @example
 * get( "lorem" )( { lorem: "ipsum" } ) // => "ipsum"
 * get( "not-exist" )( { lorem: "ipsum" } ) // => undefined
 */
module.exports = key => source =>
  typeof source === "object" ? source[key] : undefined
