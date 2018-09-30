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
test( "object::get(key: string) => (source: Object) => mixed", t => {

  t.equal(
    get( "lorem" )( {
      lorem: "ipsum",
    } ),
    "ipsum",
    "Get existing property" )

  t.equal(
    get( "not-exist" )( {
      lorem: "ipsum",
    } ),
    undefined,
    "Get non-existing property // undefined" )

  t.equal(
    get( "not-exist" )( undefined ),
    undefined,
    "Get prop from undefined // undefined" )

  t.equal(
    get( "not-exist" )( 2 ),
    undefined,
    "Get prop from non object // undefined" )

  t.end()
} )
