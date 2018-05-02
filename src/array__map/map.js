/**
 * Iterate over an input list, calling `fn` for each element, return a new
 * array
 *
 * @param  {Function}  fn    The function
 * @param  {[]}        list  Array
 *
 * @return {Array}
 */
module.exports = ( ...fn ) => input => {
  const newArray = []

  for ( let i = 0, valuesCount = input.length; i < valuesCount; i++ ) {
    let value = input[ i ]

    // pipe functions through each value
    for ( let j = 0, fnCount = fn.length; j < fnCount; j++ ) {
      value = fn[ j ].call( null, value, i, input )
    }

    newArray.push( value )
  }

  return newArray
}
