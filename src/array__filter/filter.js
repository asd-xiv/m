/**
 * { lambda_description }
 *
 * @param  {Function}  fn  The function
 *
 * @return {Array}     { description_of_the_return_value }
 */
module.exports = fn => array => {
  const filteredArray = []

  for ( let i = 0, length = array.length; i < length; i++ ) {
    fn.call( null, array[ i ] ) === true && filteredArray.push( array[ i ] )
  }

  return filteredArray
}
