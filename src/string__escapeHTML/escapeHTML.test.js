const test = require( "tape" )
const escapeHTML = require( "./escapeHTML" )

/**
 * Make safe for rendering
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
 * escapeHTML( "<div className=''>alice & bob</div>" )
 * // => "lorem \\. ipsum \\[dolor\\]"
 */
test( "string::escapeHTML( source: string ) => string", t => {
  const actual = escapeHTML( "<script type='text/javascript'>alert('HERE\'S BOBBY')</script>" )
  const expected = "&lt;script type=&#39;text&#47;javascript&#39;&gt;alert(&#39;HERE&#39;S BOBBY&#39;)&lt;&#47;script&gt;"

  t.equal( actual, expected,
    "HTML special chars are translated for safe rendering" )

  t.end()
} )
