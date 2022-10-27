/**
 * Get a subset array using offset and limit
 *
 * @param {Object} props
 * @param {number} props.offset
 * @param {number} props.limit
 * @param {Array}  input
 *
 * @returns {Array}
 *
 * @example
 * page({
 *   offset: 1,
 *   limit: 5
 * })([1, 2, 3, 4, 5, 6, 7, 8])
 * // => [2, 3, 4, 5, 6]
 */
const page =
  ({ offset = 0, limit = 10 } = {}) =>
  input =>
    [...input.splice(offset, limit)]

export { page }
