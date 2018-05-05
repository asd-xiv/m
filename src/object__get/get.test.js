const test = require( "tape" )
const get = require( "./get" )

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
test( "object::get( key: string ) => ( source: Object ) => mixed", t => {
  const source = { lorem: "ipsum" }

  t.equal(
    get( "lorem" )( source ), "ipsum",
    "Get existing property" )

  t.equal(
    get( "no-lorem" )( source ), undefined,
    "Get non-existing property // undefined" )

  t.end()
} )
