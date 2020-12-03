/**
 * @param {number} from
 * @param {number} to
 * @param {Array}  source
 *
 * @returns {Array}
 */
const _move = (from, to, source) => {
  const result = [...source]

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
 * @signature (from: number, to: number) => (source: Array) => Array
 * @signature (from: number, to: number, source: Array) => Array
 *
 * @example
 * move(0, 1, [1, 2])
 * // => [2, 1]
 */
export const move = (...params) => {
  // @signature (from, to) => (source)
  if (params.length <= 2) {
    return source => _move(params[0], params[1], source)
  }

  // @signature (from, to, source)
  return _move(...params)
}
