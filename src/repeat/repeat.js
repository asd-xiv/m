/**
 * Return an array of fixed size containing a specified value or function result
 *
 * @tag Array
 * @signature (fn: Function|mixed) => (count:number): Array
 *
 * @param  {Function|mixed}  fn     Function or value to repeat
 * @param  {number}          count  Number of times
 *
 * @return {Array}
 *
 * @example
 * repeat(2)(3)
 * // => [2, 2, 2]
 *
 * repeat(index=>index+1)(3)
 * // => [1, 2, 3]
 */
const repeat = fn => (count = 0) => {
  const result = []

  for (let i = 0; i < count; i++) {
    result.push(typeof fn === "function" ? fn.call(null, i) : fn)
  }

  return result
}

export { repeat }
