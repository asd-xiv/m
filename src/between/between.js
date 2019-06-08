/**
 * Check if value is inside open or closed interval
 *
 * @param  {number}   left         Left limit
 * @param  {number}   right        Right limit
 * @param  {Object}   arg3         Props
 * @param  {boolean}  arg3.closed  If intervals is closed or not
 *
 * @return {boolean}
 *
 * @tag Number
 * @signature (left: number, right: number, props: Object)
 *  => (source: number): boolean
 *
 * @example
 * between(2, 5)(5)
 * // => false
 * between(2, 5, {closed: true})(5)
 * // => true
 */
const between = (left, right, { closed = false } = {}) => source => {
  if (left > right) {
    throw new Error("Left interval limit must be less than right limit")
  }

  return closed === false
    ? source > left && source < right
    : source >= left && source <= right
}

export { between }
