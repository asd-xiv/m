const checkType = require( "../core__check-type/check-type" )

/**
 * Iterate over an input list, calling `fn` for each element, return a new
 * array
 *
 * @param  {Function}  fn    The function
 * @param  {[]}        list  Array
 *
 * @return {Array}
 */
module.exports = fn => input => {
  checkType( {
    schema: {
      fn   : "Function",
      input: "Array",
    },
    context: "map( fn )( input )",
  } )( { fn, input } )

  const newArray = []

  for ( let i = 0, length = input.length; i < length; i++ ) {
    newArray.push( fn.call( null, input[ i ], i ) )
  }

  return newArray
}
