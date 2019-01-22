/**
 * Merge two or more arrays into one
 *
 * @param {Array}  source1  First array
 * @param {Array}  source2  Second array
 *
 * @returns {Array}
 *
 * @tag Array
 * @signature (source1: Array) => (source2: Array) => Array
 *
 * @example
 * concat([1])([4, 5])
 * // => [1, 4, 5]
 */
module.exports = source1 => source2 => source1.concat(source2)
