const type = require( "../core__type/type" )

/**
 * Functional if-then-else
 *
 * @param  {Function}  conditionFn  Condition function
 * @param  {Function}  thenFn       Then function
 * @param  {Function}  elseFn       Else function, if not specified will return
 *                                  input
 *
 * @return {mixed}
 */
module.exports = ( conditionFn, thenFn, elseFn ) => input =>
  conditionFn( input )
    ? thenFn( input )
    : type( elseFn ) === "Function"
      ? elseFn( input )
      : input
