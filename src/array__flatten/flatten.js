const { isType } = require( "../type/type" )
const { reduce } = require( "../array__reduce/reduce" )

/**
 * Recursively concat all arrays intro a single array
 *
 * @param  {Array}  input  Array with nested arrays
 *
 * @return {Array}  1 level deep array
 */
const flatten = reduce( ( acc, item ) =>
  isType( "Array" )( item )
    ? [ ...acc, ...flatten( item ) ]
    : [ ...acc, item ], [] )

module.exports = {
  flatten,
}
