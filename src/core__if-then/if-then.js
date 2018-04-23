const { isFn } = require( "../type/type" )

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
const ifThen = ( conditionFn, thenFn, elseFn ) => input =>
  conditionFn( input )
    ? thenFn( input )
    : isFn( elseFn )
      ? elseFn( input )
      : input

module.exports = {
  ifThen,
}
