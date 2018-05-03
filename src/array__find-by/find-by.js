const reduce = require( "../array__reduce/reduce" )

/**
 * Determines 2 objects match.
 *
 * @param  {Object}  alice  Alice
 * @param  {Object}  bob    Bob
 *
 * @return {number}  True if all Alice's properties are part of Bob's
 */
const isMatch = alice => bob =>
  reduce( ( matchAcc, [ key, value ] ) => {
    const isNot = key[ 0 ] === "!"
    const cleanKey = key.replace( "!", "" )
    const isFieldMatch = isNot
      ? bob[ cleanKey ] !== value
      : bob[ cleanKey ] === value

    return matchAcc && isFieldMatch
  }, true )( Object.entries( alice ) )

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
module.exports = filter => input =>
  input.find( isMatch( filter ) )
