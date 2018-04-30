/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity, the remaining functions must be unary.
 *
 * @param   {Array}  fn     Array of functions, call each one in order with the
 *                          input of previous one's result
 * @param   {Array}  input  Arguments array
 *
 * @return  {mixed}
 *
 * @example
 * pipe( inc, inc )( 2 )
 * // => 4
 */
module.exports = ( ...fn ) => ( ...input ) => {
  const [ firstFn, ...restFn ] = fn
  let acc = firstFn.apply( null, input )

  for ( let i = 0, length = restFn.length; i < length; i++ ) {
    acc = restFn[ i ]( acc, input[ i ], i, input )
  }

  return acc
}
