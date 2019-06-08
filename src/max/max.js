/**
 * Find max value using language operator
 *
 * @param  {Array}  source  Source input
 *
 * @return {mixed}
 */
const maxByValue = source => {
  if (source.length === 0) {
    return undefined
  }

  let [maxValue] = source

  for (let i = 0, length = source.length; i < length; i++) {
    if (maxValue < source[i]) {
      maxValue = source[i]
    }
  }

  return maxValue
}

/**
 * Find max value using function to transform element into numeric
 *
 * @param  {Function}  fn      Transform function
 * @param  {Array}     source  Source input
 *
 * @return {mixed}
 */
const maxByFunction = fn => source => {
  if (source.length === 0) {
    return undefined
  }

  const result = {
    item: source[0],
    value: fn.call(null, source[0]),
  }

  for (let i = 1, length = source.length; i < length; i++) {
    if (result.value < fn.call(null, source[i])) {
      result.item = source[i]
      result.value = fn.call(null, result.item)
    }
  }

  return result.item
}

/**
 * Find the maximum value in a source array
 *
 * @param  {Array|Function} arg1    Custom transform function or source array
 * @param  {number[]}       source  Array of numbers
 *
 * @return {number}
 *
 * @name max
 * @tag Array
 * @signature ( source: Number[] ): Number
 * @signature ( fn: Function ) => ( source: Number[] ): Number
 *
 * @example
 * max([-1, 1, 10, 3])
 * // => 10
 *
 * const fn = element => ( new Date( element.time ) )
 * const source = [
 *   { time: "2018-05-15T11:20:07.754110Z" },
 *   { time: "2018-06-11T09:01:54.337344Z" },
 *   { time: "2018-06-08T08:26:12.711071Z" },
 * ]
 * max(fn)(source)
 * // => {time: "2018-06-11T09:01:54.337344Z"}
 */
const max = arg1 =>
  Array.isArray(arg1) ? maxByValue(arg1) : maxByFunction(arg1)

export { max }
