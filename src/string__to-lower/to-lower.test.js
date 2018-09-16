const test = require( "tape" )
const toLower = require( "./to-lower" )

/**
 * Convert string to lower case
 *
 * @tag String
 * @signature ( source: string ): string
 *
 * @param   {string}  source  Source string
 *
 * @return  {string}
 *
 * @example
 * const scores = split(",")("lorem,ipsum")
 * // ["lorem", "ipsum"]
 */
test( "string::toLower( source: string ): string", t => {
  const source = "Lorem Opsum"

  t.equals(
    toLower( source ), "lorem opsum",
    "Convert uppercase chars into lowercase" )

  t.end()
} )
