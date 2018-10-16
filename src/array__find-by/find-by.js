const isMatch = require("../core__is-match/is-match")

/**
 * Find the first element that matches the filter criteria
 *
 * @param   {Object}            filter  Object containing one or more fields
 * @param   {Object}            input  Object containing one or more fields
 *
 * @return  {Object|undefined}  First element that matches
 *
 * @example
 * const comments = [ { id: 1, body: "" }, { id: 2, body: "dolor" } ]
 *
 * findBy( { id: 2 } )( comments )
 * // => { id: 2, body: "dolor" }
 */
module.exports = filter => input => input.find(x => isMatch(filter)(x))
