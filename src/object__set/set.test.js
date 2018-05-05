const test = require( "tape" )
const set = require( "./set" )

/**
 * Create or modify a property on a object.
 *
 * @tag Object
 * @signature ( prop: string, value: mixed ) => ( source: Object ): Object
 *
 * @example
 * set( "a", "lorem" )( { b: "ipsum" } )
 * // => { a: "lorem", b: "ipsum" }
 */
test( "( prop: string, value: mixed ) => ( source: Object ): Object", t => {
  const source = { lorem: "ipsum" }

  t.deepEqual(
    set( "lorem", "42" )( source ), { lorem: "42" },
    "Overwrite property" )

  t.deepEqual(
    set( "dolor", 42 )( source ), { lorem: "ipsum", dolor: 42 },
    "Create property" )

  t.notEqual(
    set( "lorem", "ipsum" )( source ), source,
    "Result object is a shallow clone" )

  t.end()
} )
