/**
 * @param {number} from
 * @param {number} to
 * @param {Array}  input
 *
 * @returns {Array}
 */
const _move = (from, to, input) => {
  const result = [...input]

  const fromIndex = from < 0 ? result.length + from : from

  if (fromIndex >= 0 && fromIndex < result.length) {
    const toIndex = to < 0 ? result.length + to : to

    const [item] = result.splice(from, 1)

    result.splice(toIndex, 0, item)
  }

  return result
}

/**
 * Move element from one position to another
 *
 * @param {...any} params
 *
 * @returns {Array}
 *
 * @name move
 * @tag Array
 * @signature (from: number, to: number) => (input: Array) => Array
 * @signature (from: number, to: number, input: Array) => Array
 *
 * @example
 * move(0, 1, [1, 2])
 * // => [2, 1]
 */
export const move = (...params) => {
  // @signature (from, to) => (input)
  if (params.length <= 2) {
    return input => _move(params[0], params[1], input)
  }

  // @signature (from, to, input)
  return _move(...params)
}
