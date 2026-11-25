type IsEqualFn = {
  <T>(a: T, b: T): boolean
  <T>(a: T): (b: T) => boolean
}

const _isEqual = (a: unknown, b: unknown): boolean =>
  Number.isNaN(a) && Number.isNaN(b) ? true : a === b

/**
 * Check if two values are equal with SameValueZero, as
 * `Array.prototype.includes`: `===`, except that `NaN` equals `NaN`. An array
 * or an object equals only itself.
 *
 * @param {unknown} a - First value
 * @param {unknown} b - Second value
 *
 * @returns {boolean} True if values are strictly equal
 *
 * @example
 * isEqual(2, 2)
 * // => true
 *
 * isEqual("2")(2)
 * // => false
 *
 * isEqual(NaN, NaN)
 * // => true
 *
 * isEqual([1])([1])
 * // => false
 *
 * @name isEqual
 * @tag Any value
 */
const isEqual = ((...params: unknown[]) => {
  // @signature (a) => (b)
  if (params.length === 1) {
    return (b: unknown) => _isEqual(params[0], b)
  }

  // @signature (a, b)
  return _isEqual(params[0], params[1])
}) as IsEqualFn

export { isEqual }
export type { IsEqualFn }
