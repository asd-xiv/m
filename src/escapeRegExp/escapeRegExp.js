import { escape } from "../escape/escape"

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
const escapeRegExp = escape(/[|\\{}<>()[\]^$+*?.]/g)

export { escapeRegExp }
