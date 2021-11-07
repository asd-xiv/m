/**
 * Check if value is inside open or closed interval
 *
 * @param {number}  left        Left limit
 * @param {number}  right       Right limit
 * @param {Object}  arg3        Props
 * @param {boolean} arg3.closed If intervals is closed or not
 *
 * @returns {boolean}
 *
 * @tag Number
 * @signature (left: number, right: number, props: Object) => (source: number): boolean
 *
 * @example
 * between(2, 5)(5)
 * // => false
 *
 * between(2, 5, {closed: true})(5)
 * // => true
 */
export const isBetween =
  (left, right, { closed = false } = {}) =>
  input => {
    if (left > right) {
      throw new Error("Left interval limit must be less than right limit")
    }

    return closed === false
      ? input > left && input < right
      : input >= left && input <= right
  }
