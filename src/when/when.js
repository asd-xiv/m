/* eslint-disable jsdoc/check-param-names,jsdoc/require-param */

import { pipe } from "../pipe/pipe.js"
import { i } from "../i/i.js"

const _when = (_ifFn, _thenFn, _elseFn = i, input) => {
  const ifFn = Array.isArray(_ifFn) ? pipe(..._ifFn) : _ifFn
  const thenFn = Array.isArray(_thenFn) ? pipe(..._thenFn) : _thenFn
  const elseFn = Array.isArray(_elseFn) ? pipe(..._elseFn) : _elseFn

  return ifFn(input) ? thenFn(input) : elseFn(input)
}

/**
 * Functional if-then-else
 *
 * @param {Function} ifFn
 * @param {Function} thenFn
 * @param {Function} [elseFn=i]
 * @param {any}      source
 *
 * @returns {any}
 *
 * @tag Core
 * @signature (ifFn: Function, thenFn: Function, elseFn: Function, source: any): any
 * @signature (ifFn: Function, thenFn: Function, source: any): any
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
    return input => _when(params[0], params[1], undefined, input)
  }

  // @signature (ifFn, thenFn, elseFn) => (source)
  if (params.length <= 3) {
    return input => _when(params[0], params[1], params[2], input)
  }

  // @signature (ifFn, thenFn, elseFn, source)
  return _when(...params)
}
