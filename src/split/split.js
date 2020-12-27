const _split = (separator, source) => {
  if (!(separator instanceof RegExp) && typeof separator !== "string") {
    throw new TypeError(
      `split - invalid 'separator' parameter type '${typeof separator}'. 'separator' type should be a String or RegExp.`
    )
  }

  if (typeof source !== "string") {
    throw new TypeError(
      `split - invalid 'source' parameter type '${typeof source}'. 'source' type should be String.`
    )
  }

  return source.split(separator)
}

/**
 * Splits a String object into an array of strings by separating the string
 * into substrings, using a specified separator string to determine where to
 * make each split.
 *
 * @tag String
 * @signature (separator: string|RegExp, source:string): Array
 * @signature (separator: string|RegExp) => (source:string): Array
 *
 * @param {...any}        params
 * @param {string|RegExp} params.separator Points where each split should occur
 * @param {string}        params.source    Source string
 *
 * @returns {Array}
 *
 * @example
 * split(",", "lorem,ipsum")
 * // ["lorem", "ipsum"]
 */
export const split = (...params) => {
  // @signature (separator) => (source)
  if (params.length <= 1) {
    return source => _split(params[0], source)
  }

  // @signature (separator, source)
  return _split(...params)
}
