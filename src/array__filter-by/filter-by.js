const filter = require("../array__filter/filter")
const isMatch = require("../core__is-match/is-match")

/**
 * Filter an array of objects
 *
 * @tag Array
 * @signature (matchObject: Object) => (source: Object[]): Object[]
 *
 * @param   {Object}  matchObject  Match object
 *
 * @return  {Object[]} Array of objects that match the filter criteria
 *
 * @example { example }
 *
 * filterBy( { "!id": 2 } )( [
 *   { lorem: 2 },
 *   { lorem: 3 },
 *   { id: 2 }
 * ] )
 * // [
 * // { lorem: 2 },
 * // { lorem: 3 }
 * // ]
 *
 * filterBy( { "items": 2 } )( [
 *   { id: 2, items: 2 }
 *   { id: 3, items: 1 }
 *   { id: 4, items: 2 }
 * ] )
 * // [
 * // { id: 2, items: 2 },
 * // { id: 4, items: 2 }
 * // ]
 */
module.exports = matchObject => filter(isMatch(matchObject))
