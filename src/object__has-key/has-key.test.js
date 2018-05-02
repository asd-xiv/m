const test = require( "tape" )
const hasKey = require( "./has-key" )

test( "object::hasKey( key )( input ): boolean", t => {
  t.equal(
    hasKey( "lorem" )( { lorem: "ipsum" } ), true,
    "(\"lorem\")({lorem:\"ipsum\"}) // => true" )

  t.equal(
    hasKey( "lorem" )( {} ), false,
    "(\"lorem\")({}) // => false" )

  t.equal(
    hasKey( "toString" )( {} ), false,
    "(\"toString\")({}) // => false" )

  t.equal(
    hasKey( "toString" )( Object.create( null ) ), false,
    "(\"toString\")(Object.create(null)) // => false" )

  t.equal(
    hasKey( "lorem" )( { lorem: undefined } ), true,
    "(\"lorem\")({lorem:undefined}) // => true" )

  t.equal(
    hasKey( "lorem" )( { lorem: NaN } ), true,
    "(\"lorem\")({lorem:NaN}) // => true" )

  t.equal(
    hasKey( "lorem" )( { lorem: null } ), true,
    "(\"lorem\")({lorem:null}) // => true" )

  t.throws( () => {
    hasKey( {} )( {} )
  }, /^TypeError: Expected "key" to be "String"/,
  "param \"key\" should be of type \"String\"" )

  t.throws( () => {
    hasKey( "lorem" )( [] )
  }, /^TypeError: Expected "input" to be "Object"/,
  "param \"input\" should be of type \"Object\"" )

  t.end()
} )
