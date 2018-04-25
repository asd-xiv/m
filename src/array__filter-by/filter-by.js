const filter = require( "../array__filter/filter" )
const reduce = require( "../array__reduce/reduce" )

/**
 * Determines one object is part of another
 *
 * @param  {Object}  alice  Alice
 * @param  {Object}  bob    Bob
 *
 * @return {number}  True if all Alice is part of Bob
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
 * Filter an array of objects
 *
 * @param   {Object}  filterObj  Object containing one or more fields
 *
 * @return  {Array}   { description_of_the_return_value }
 *
 * @example { example }
 *
 * filterBy( { "!id": 2 } )( [ { lorem: 2 }, { lorem: 3 }, { id: 2 } ] )
 * // [ { lorem: 2 }, { lorem: 3 } ]
 */
module.exports = filterObj =>
  filter( isMatch( filterObj ) )
