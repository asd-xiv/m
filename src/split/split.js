const _split = (separator, input) => {
  if (!(separator instanceof RegExp) && typeof separator !== "string") {
    throw new TypeError(
      `split - invalid 'separator' parameter type '${typeof separator}'. 'separator' type should be a String or RegExp.`
    )
  }

  if (typeof input !== "string") {
    throw new TypeError(
      `split - invalid 'source' parameter type '${typeof input}'. 'source' type should be String.`
    )
  }

  return input.split(separator)
}

/**
 * Splits a String object into an array of strings by separating the string
 * into substrings, using a specified separator string to determine where to
 * make each split.
 *
 * @tag String
 * @signature (separator: string|RegExp, input:string): Array
 * @signature (separator: string|RegExp) => (input:string): Array
 *
 * @param {...any}        params
 * @param {string|RegExp} params.separator Points where each split should occur
 * @param {string}        params.input     Input string
 *
 * @returns {Array}
 *
 * @example
 * split(",", "lorem,ipsum")
 * // ["lorem", "ipsum"]
 */
export const split = (...params) => {
  // @signature (separator) => (input)
  if (params.length <= 1) {
    return input => _split(params[0], input)
  }

  // @signature (separator, input)
  return _split(...params)
}
