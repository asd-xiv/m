/**
 * Add element at end of array
 *
 * @param  {mixed}  element  Element to be added
 * @param  {Array}  input    Array to add to
 *
 * @return {Array}  New array with added element
 */
module.exports = ( ...elements ) => input =>
  input.concat( elements )
