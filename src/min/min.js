import { pipe } from "../pipe/pipe.js"
import { curry } from "../curry/curry.js"

const _minBy = (_fn, input) => {
  const fn = Array.isArray(_fn) ? pipe(..._fn) : _fn

  if (input.length === 0) {
    return
  }

  const result = {
    item: input[0],
    value: fn(input[0]),
  }

  for (let i = 1, length = input.length; i < length; i++) {
    if (result.value > fn(input[i])) {
      result.item = input[i]
      result.value = fn(result.item)
    }
  }

  return result.item
}

/**
 * Find the minimum value in a source array
 *
 * @param {number[]} input Array of numbers
 *
 * @returns {number}
 *
 * @name min
 * @tag Array
 * @signature ( input: Number[] ): Number
 * @signature ( fn: Function ) => ( input: Number[] ): Number
 *
 * @example
 * min([-1, 1, 10, 3])
 * // => -1
 *
 * const fn = element => ( new Date( element.time ) )
 * const input = [
 *   { time: "2018-05-15T11:20:07.754110Z" },
 *   { time: "2018-06-11T09:01:54.337344Z" },
 *   { time: "2018-06-08T08:26:12.711071Z" },
 * ]
 * min(fn)(input)
 * // => {time: "2018-05-15T11:20:07.754110Z"}
 */
export const min = input => {
  if (input.length === 0) {
    return
  }

  let [result] = input

  for (let i = 0, length = input.length; i < length; i++) {
    if (result > input[i]) {
      result = input[i]
    }
  }

  return result
}

export const minBy = curry(_minBy)
