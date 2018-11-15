const type = require("../type/type")

/**
 * Functional if-then-else
 *
 * @param  {Function}  ifFn    Condition function
 * @param  {Function}  thenFn  Then function
 * @param  {Function}  elseFn  Else function, if not specified will return
 *                             source
 *
 * @return {mixed}
 *
 * @tag Core
 * @signature (ifFn: Function, thenFn: Function, elseFn: Function) => (source: mixed): mixed
 *
 * @example
 * when(isEven, increment, decrement)(5)
 * // => 6
 * when(isOdd, increment)(6)
 * // => 6
 */
module.exports = (ifFn, thenFn, elseFn) => source =>
  ifFn(source)
    ? thenFn(source)
    : type(elseFn) === "Function"
    ? elseFn(source)
    : source
