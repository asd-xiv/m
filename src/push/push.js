/**
 * Add element at end of array
 *
 * @param {mixed} elements Element to be added
 * @param {Array} source   Array to add to
 *
 * @returns {Array}
 *
 * @name push
 * @tag Array
 * @signature (...elements: mixed) => (source: Array): Array
 *
 * @example
 * push(2)([1]) // => [1, 2]
 * push(2, 4)([1]) // => [1, 2, 4]
 */
const push = (...elements) => source => [...source, ...elements]

export { push }
