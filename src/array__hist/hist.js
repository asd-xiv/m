/**
 * Determine the count of all field's distinct values in a list of objects
 * (aka histogram)
 *
 * @tag Array
 * @signature (field: string)(source: Object[]): Object
 *
 * @param   {string}    field   Field name to count
 * @param   {Object[]}  source  Array of objects
 *
 * @return  {Object}
 *
 * @example
 *
 * const scores = [{
 *  name   : "Bob",
 *  score  : 1,
 *  subject: "Math"
 * }, {
 *  name   : "Alice",
 *  score  : 10,
 *  subject: "Math"
 * }, {
 *  name   : "Hatter",
 *  score  : 10,
 *  subject: "Math"
 * }]
 *
 * hist( "score" )( scores )
 * // => { "1": 1, "10": 2 }
 */
module.exports = field => source => {
  const result = {}

  for ( let i = 0, length = source.length; i < length; i++ ) {
    if ( !!source[ i ][ field ] ) {
      const groupKey = String( source[ i ][ field ] )

      result[ groupKey ] = result[ groupKey ]
        ? result[ groupKey ] + 1
        : 1
    }
  }

  return result
}
