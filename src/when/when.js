import { is } from "../is/is"

/**
 * Functional if-then-else
 *
 * @param  {Function}  ifFn    Condition
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
 *
 * when(isOdd, increment)(6)
 * // => 6
 */
export const when = (ifFn, thenFn, elseFn) => source => {
  if (ifFn(source)) {
    return typeof thenFn === "function" ? thenFn(source) : thenFn
  }

  if (typeof elseFn === "function") {
    return elseFn(source)
  }

  return is(elseFn) ? elseFn : source
}
