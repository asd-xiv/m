const type = source =>
  Array.isArray(source)
    ? "Array"
    : source instanceof Date
    ? "Date"
    : source instanceof RegExp
    ? "RegExp"
    : source instanceof Object
    ? "Object"
    : "other"

const _isDeepEqual = (a, b) => {
  // added 100k ops/sec
  if (a === b) {
    return true
  }

  const aType = type(a)
  const bType = type(b)

  if (aType !== bType) {
    return false
  }

  //
  if (aType === "Array") {
    if (a.length !== b.length) {
      return false
    }

    for (let i = 0, length = a.length; i < length; i++) {
      if (!_isDeepEqual(a[i], b[i])) {
        return false
      }
    }

    return true
  }

  //
  if (aType === "Object") {
    const aliceEntries = Object.entries(a)
    const bobEntries = Object.entries(b)

    if (aliceEntries.length !== bobEntries.length) {
      return false
    }

    for (let i = 0, length = aliceEntries.length; i < length; i++) {
      const [aliceKey, aliceValue] = aliceEntries[i]

      if (!_isDeepEqual(b[aliceKey], aliceValue)) {
        return false
      }
    }

    return true
  }

  //
  if (aType === "RegExp") {
    return a.toString() === b.toString()
  }

  //
  if (aType === "Date") {
    return a.getTime() === b.getTime()
  }

  return false
}

/**
 * Determine if two variables are structurally equal
 *
 * @param {Any} a Source input
 * @param {Any} b Other source input
 *
 * @returns {Boolean} True if inputs are structurally equal, false otherwise
 *
 * @name isDeepEqual
 * @tag Core
 * @signature (a: Any, b: Any): Boolean
 * @signature (a: Any)(b: Any): Boolean
 *
 * @see {@link clone}
 *
 * @example
 * deepEqual(
 *   {b: 3, a: 2},
 *   {a: 2, b: 3}
 * )
 * // => true
 *
 * deepEqual(
 *   {a :[1, 2]}
 * )(
 *   {a: [2, 1]}
 * )
 * // => false
 */
export const isDeepEqual = (...params) => {
  // @signature (a) => (b)
  if (params.length <= 1) {
    return b => _isDeepEqual(params[0], b)
  }

  // @signature (a, b)
  return _isDeepEqual(...params)
}
