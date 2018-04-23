/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity, the remaining functions must be unary.
 *
 * @param  {Array}  fns  The functions
 *
 * @return {Any}
 */
const pipe = ( ...fns ) => ( ...input ) => {
  const [ firstFn, ...restFn ] = fns
  let acc = firstFn.apply( null, input )

  for ( let i = 0, length = restFn.length; i < length; i++ ) {
    acc = restFn[ i ]( acc, input[ i ], i, input )
  }

  return acc
}

module.exports = {
  pipe,
}
