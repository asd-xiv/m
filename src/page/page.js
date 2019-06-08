/**
 * Get a subset array using offset and limit
 *
 * @param  {number}  offset  Start position
 * @param  {number}  limit   How many items
 * @param  {Array}   source  Input array
 *
 * @return {Array}
 *
 * @example
 * page({
 *   offset: 1,
 *   limit: 5
 * })([1, 2, 3, 4, 5, 6, 7, 8])
 * // => [2, 3, 4, 5, 6]
 */
const page = ({ offset = 0, limit = 10 } = {}) => source => [
  ...source.splice(offset, limit),
]

export { page }
