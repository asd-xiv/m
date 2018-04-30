/**
 * Combine from left to right, 2 or more objects into a single one. Properties
 * with the same name will be overwriten by right most object.
 *
 * @param   {Array}   input  Array of objects
 *
 * @return  {Object}  { description_of_the_return_value }
 *
 * @example
 * merge( { a: "lorem" }, { b: "ipsum", c: 41 }, { c: 42 }, {} )
 * // { a: "lorem", b: "ipsum", c: 42 }
 */
module.exports = ( ...input ) =>
  Object.assign( {}, ...input )
