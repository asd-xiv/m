import { is } from "../is/is"

const _merge = (fn, source) => {
  let result = {}

  for (let i = 0, length = source.length; i < length; i++) {
    const sourceEntries = Object.entries(source[i])

    if (is(fn)) {
      result = fn(result, source[i])
    } else {
      for (
        let j = 0, sourceEntriesLength = sourceEntries.length;
        j < sourceEntriesLength;
        j++
      ) {
        const [key, value] = sourceEntries[j]

        result[key] = value
      }
    }
  }

  return result
}

/**
 * Combine from left to right, 2 or more objects into a new single one.
 * Properties will be shallow copied. Those with the same name will be
 * overwriten by right most object.
 *
 * @tag Object
 * @signature ( ...source: Object[] ): Object
 * @param {Object[]} source Array of objects
 * @param {...any}   params Function params
 *
 * @returns {Object}
 *
 * @example
 *
 * merge({a: "lorem"}, {b: "ipsum", c: 41}, {c: 42, b: undefined})
 * // => { a: "lorem", b: "ipsum", c: 42 }
 */
export const merge = (...params) => {
  // @signature (obj1) => (obj2)
  if (params.length <= 1) {
    return obj2 => _merge(null, [params[0], obj2])
  }

  // @signature (obj1, obj2)
  return _merge(null, params)
}

export const mergeBy = (...params) => {
  // @signature (fn) => (source)
  if (params.length <= 1) {
    return source => _merge(params[0], source)
  }

  // @signature (fn, source)
  return _merge(...params)
}

export const mergeAll = source => _merge(null, source)
