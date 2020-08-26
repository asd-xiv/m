/**
 * Join all elements of an array into a string
 *
 * @tag Array
 * @signature (separator: String)(source: Array): String
 * @signature (separator: String, source: Array): String
 *
 * @param {String} separator Separator between each adjacent elements
 * @param {[]}     source    Source array
 *
 * @return {String}
 *
 * @example
 * join(",")(["lorem", "ipsum"])
 * // => "lorem,ipsum"
 */
const join = (separator, ...rest) => {
  if (rest.length === 0) {
    return source => [].join.call(source, separator)
  }

  return [].join.call(rest[0], separator)
}

export { join }
