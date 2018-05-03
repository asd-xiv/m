const test = require( "tape" )
const hasKey = require( "./has-key" )

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
test( "object::( key: string ) => ( input: Object ): boolean", t => {
  t.equal(
    hasKey( "lorem" )( { lorem: "ipsum" } ), true,
    "\"lorem\" key exists" )

  t.equal(
    hasKey( "lorem" )( {} ), false,
    "\"lorem\" key does not exist" )

  t.equal(
    hasKey( "toString" )( {} ), false,
    "Prototype key \"toString\" does not return false-positive" )

  t.equal(
    hasKey( "toString" )( Object.create( null ) ), false,
    "\"toString\" key does not exist on object without prototype" )

  t.equal(
    hasKey( "lorem" )( { lorem: undefined } ), true,
    "\"lorem\" key exists even if value is \"undefined\"" )

  t.equal(
    hasKey( "lorem" )( { lorem: NaN } ), true,
    "\"lorem\" key exists even if value is \"NaN\"" )

  t.equal(
    hasKey( "lorem" )( { lorem: null } ), true,
    "\"lorem\" key exists even if value is \"null\"" )

  t.equal(
    hasKey( "lorem" )( { lorem: 0 } ), true,
    "\"lorem\" key exists even if value is \"0\"" )

  t.end()
} )
