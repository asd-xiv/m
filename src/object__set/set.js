/**
 * Create or modify a property on a object
 *
 * @param      {string}  prop    Property name
 * @param      {mixed}   value   Property value
 * @param      {Object}  source  Source object
 *
 * @return     {Object}  Modified source object
 *
 * @example
 *
 * set( "a", "lorem" )( { b: "ipsum" } )
 * // { a: "lorem", b: "ipsum" }
 */
module.exports = ( prop, value ) => source =>
  Object.defineProperty( source, prop, {
    value,
    writable    : true,
    configurable: true,
    enumerable  : true,
  } )
