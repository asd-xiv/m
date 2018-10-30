const reduce = require("../reduce/reduce")

/**
 * Recursively concat all arrays intro a single array
 *
 * @param  {Array}  input  Array with nested arrays
 *
 * @return {Array}  1 level deep array
 *
 * @example
 * flatten( [ 1, [ 2 ], [ 3, [ 4 ] ] ] )
 * // => [ 1, 2, 3, 4 ]
 */
const flatten = reduce(
  (acc, item) =>
    Array.isArray(item) ? [...acc, ...flatten(item)] : [...acc, item],
  []
)

module.exports = flatten
