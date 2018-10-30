const escape = require("../escape/escape")

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
module.exports = escape(/[|\\{}<>()[\]^$+*?.]/g)
