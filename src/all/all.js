/**
 * Test if all elements of array satisfy function
 *
 * @param {Function}  fn      Function that all elements need to satisfy
 * @param {Array}     source  Source array
 *
 * @return {boolean}
 *
 * @tag Core
 * @signature (fn: Function) => (source: Array): boolean
 *
 * @example
 * all(isNumber)([1, 2, 3])
 * // => true
 * all(is)([1, "asd", null])
 * // => false
 */
module.exports = fn => source => {
  for (let i = 0, length = source.length - 1; i <= length; i++) {
    if (fn.call(null, source[i]) !== true) {
      return false
    }
  }

  return true
}
