const test = require( "tape" )
const escapeRegExp = require( "./escapeRegExp" )

/**
 * Make safe for RegExp'ing
 *
 * @param   {string}  source  Source string
 *
 * @return  {string}
 *
 * @tag String
 * @signature ( source: string ): string
 *
 * @example { example }
 *
 * escapeRegExp( "lorem. ipsum [dolor]" )
 * // => "lorem \\. ipsum \\[dolor\\]"
 */
test( "string::escapeRegExp( source: string ) => string", t => {
  const actualT1 = escapeRegExp( "lorem. ipsum [dolor] (sit amet)?" )
  const expectedT1 = "lorem\\. ipsum \\[dolor\\] \\(sit amet\\)\\?"

  t.equal( actualT1, expectedT1,
    "Chars: (, ), [, ], ?, . should be escaped" )

  const actualT2 = escapeRegExp( "Alice + Bob = $orry | A < B | f* => {}" )
  const expectedT2 = "Alice \\+ Bob = \\$orry \\| A \\< B \\| f\\* =\\> \\{\\}"

  t.equal( actualT2, expectedT2,
    "Chars: +, $, |, <, >, *, {, } should be escaped" )

  t.end()
} )
