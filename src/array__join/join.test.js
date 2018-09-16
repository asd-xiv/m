const test = require( "tape" )
const join = require( "./join" )

/**
 * Join all elements of an array into a string
 *
 * @tag Array
 * @signature ( separator: string )( source: Array ): string
 *
 * @param   {string}  separator  Separator between each adjacent elements
 * @param   {string}  source     Source string
 *
 * @return  {string}
 *
 * @example
 * join( "," )( [ "lorem", "ipsum" ] )
 * // => "lorem,ipsum"
 */
test( "array::join( separator: string )( source: Array ): string", t => {
  const source = [ "lorem", "ipsum" ]

  t.equals(
    join( "," )( source ), "lorem,ipsum",
    "Join array with 2 string into 1" )

  t.end()
} )
