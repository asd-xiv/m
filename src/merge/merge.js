import { is } from "../is/is.js"

const _merge = (fn, input) => {
  let result = {}

  for (const object of input) {
    result = is(fn) ? fn(result, object) : { ...result, ...object }
  }

  return result
}

/**
 * Combine from left to right, 2 or more objects into a new single one.
 * Properties will be shallow copied. Those with the same name will be
 * overwriten by right most object.
 *
 * @param {Object[]} input  Array of objects
 * @param {...any}   params Function params
 *
 * @returns {Object}
 *
 * @name merge
 * @tag Object
 * @signature (...input: Object[]): Object
 *
 * @example
 *
 * merge({a: "lorem"}, {b: "ipsum", c: 41}, {c: 42, b: undefined})
 * // => { a: "lorem", b: "ipsum", c: 42 }
 */
export const merge = (...params) => {
  // @signature (obj1) => (obj2)
  if (params.length <= 1) {
    return nextObject => _merge(undefined, [params[0], nextObject])
  }

  // @signature (obj1, obj2)
  return _merge(undefined, params)
}

export const mergeBy = (...params) => {
  // @signature (fn) => (input)
  if (params.length <= 1) {
    return input => _merge(params[0], input)
  }

  // @signature (fn, input)
  return _merge(...params)
}

export const mergeAll = input => _merge(undefined, input)
