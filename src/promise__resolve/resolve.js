const pipe = require( "../core__pipe/pipe" )
const ifThen = require( "../core__if-then/if-then" )

/**
 * Wrapp with promise
 *
 * @param  {Function}  inputFn  The input function
 * @param  {Function}  thenFn   The then function
 * @param  {Function}  catchFn  The catch function
 *
 * @return {Promise}
 */
module.exports = ( inputFn, thenFn, catchFn ) =>
  pipe(
    ( ...inputArgs ) =>
      Promise.resolve( inputFn.call( null, ...inputArgs ) ),
    ifThen( () => !!thenFn,
      promise => promise.then( thenFn ),
    ),
    ifThen( () => !!catchFn,
      promise => promise.catch( catchFn ),
    )
  )
