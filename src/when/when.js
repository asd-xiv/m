import { pipe } from "../pipe/pipe"
import { i } from "../i/i"

const _when = (_ifFn, _thenFn, _elseFn = i, source) => {
  const ifFn = Array.isArray(_ifFn) ? pipe(..._ifFn) : _ifFn
  const thenFn = Array.isArray(_thenFn) ? pipe(..._thenFn) : _thenFn
  const elseFn = Array.isArray(_elseFn) ? pipe(..._elseFn) : _elseFn

  return ifFn(source) ? thenFn(source) : elseFn(source)
}

/**
 * Functional if-then-else
 *
 * @param {Function} ifFn   Condition
 * @param {Function} thenFn Then function
 * @param {Function} elseFn Else function, if not specified will return source
 * @param {...any}   params Function params
 *
 * @returns {mixed}
 *
 * @tag Core
 * @signature (ifFn: Function, thenFn: Function, elseFn: Function, source: mixed): mixed
 * @signature (ifFn: Function, thenFn: Function, source: mixed): mixed
 *
 * @example
 * when(isEven, increment, decrement)(5)
 * // => 6
 *
 * when(isOdd, increment)(6)
 * // => 6
 */
export const when = (...params) => {
  // @signature (ifFn, thenFn) => (source)
  if (params.length <= 2) {
    return source => _when(params[0], params[1], undefined, source)
  }

  // @signature (ifFn, thenFn, elseFn) => (source)
  if (params.length <= 3) {
    return source => _when(params[0], params[1], params[2], source)
  }

  // @signature (ifFn, thenFn, elseFn, source)
  return _when(...params)
}
