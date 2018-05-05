const test = require( "tape" )
const pick = require( "./pick" )

/**
 *
 *
 * @tag Object
 * @signature ( keys: string[] ) => ( source: Object ): Object
 *
 * @example
 *
 */

test( "object::pick( keys: string[] ) => ( source: Object ): Object", t => {
  const source = {
    lorem: "ipsum",
    dolor: "amet",
  }

  t.deepEqual(
    pick( [ "dolor", "lorem" ] )( source ), { lorem: "ipsum", dolor: "amet" },
    "All existing keys" )

  t.deepEqual(
    pick( [ "lorem", "not-exist" ] )( source ), { lorem: "ipsum" },
    "Some non-existing keys" )

  t.deepEqual(
    pick( [ "not-exist" ] )( source ), {},
    "All non-existing keys" )

  t.end()
} )
