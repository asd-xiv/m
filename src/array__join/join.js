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
module.exports = separator => source =>
  [].join.call( source, separator )
