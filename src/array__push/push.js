const checkType = require( "../core__check-type/check-type" )

/**
 * Add element at end of array
 *
 * @param  {mixed}  element  Element to be added
 * @param  {Array}  input    Array to add to
 *
 * @return {Array}  New array with added element
 */
module.exports = ( ...elements ) => input => {
  checkType( {
    schema: {
      input: "Array",
    },
    context: "push( ...elements )( input )",
  } )( { input } )

  return input.concat( elements )
}
