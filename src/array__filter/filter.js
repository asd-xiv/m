/**
 * Remove elements that dont match based on custom function
 *
 * @param  {Function}  fn  The function
 *
 * @return {Array}
 *
 * @tag Array
 * @signature ( fn: Function ) => ( source: Array): Array
 */
module.exports = fn => source => {
  const filteredArray = []

  for ( let i = 0, length = source.length; i < length; i++ ) {
    fn.call( null, source[ i ] ) === true && filteredArray.push( source[ i ] )
  }

  return filteredArray
}
