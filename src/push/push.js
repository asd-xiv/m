/**
 * Add elements at end of array
 *
 * @param {any}   elements
 * @param {Array} input
 *
 * @returns {Array}
 *
 * @name push
 * @tag Array
 * @signature (...elements: any) => (input: Array): Array
 *
 * @example
 * push(2)([1]) // => [1, 2]
 * push(2, 4)([1]) // => [1, 2, 4]
 */
const push =
  (...elements) =>
  input =>
    [...input, ...elements]

export { push }
