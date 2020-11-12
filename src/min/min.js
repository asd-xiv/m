import { pipe } from "../pipe/pipe"
import { curry } from "../curry/curry"

const _minBy = (_fn, source) => {
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn

  if (source.length === 0) {
    return undefined
  }

  const result = {
    item: source[0],
    value: fn.call(null, source[0]),
  }

  for (let i = 1, length = source.length; i < length; i++) {
    if (result.value > fn.call(null, source[i])) {
      result.item = source[i]
      result.value = fn.call(null, result.item)
    }
  }

  return result.item
}

/**
 * Find the minimum value in a source array
 *
 * @param {number[]} source Array of numbers
 *
 * @returns {number}
 *
 * @name min
 * @tag Array
 * @signature ( source: Number[] ): Number
 * @signature ( fn: Function ) => ( source: Number[] ): Number
 *
 * @example
 * min([-1, 1, 10, 3])
 * // => -1
 *
 * const fn = element => ( new Date( element.time ) )
 * const source = [
 *   { time: "2018-05-15T11:20:07.754110Z" },
 *   { time: "2018-06-11T09:01:54.337344Z" },
 *   { time: "2018-06-08T08:26:12.711071Z" },
 * ]
 * min(fn)(source)
 * // => {time: "2018-05-15T11:20:07.754110Z"}
 */
export const min = source => {
  if (source.length === 0) {
    return undefined
  }

  let [result] = source

  for (let i = 0, length = source.length; i < length; i++) {
    if (result > source[i]) {
      result = source[i]
    }
  }

  return result
}

export const minBy = curry(_minBy)
