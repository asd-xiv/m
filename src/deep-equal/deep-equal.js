/* eslint-disable no-use-before-define */

const byType = {
  /**
   * Determine if 2 arrays are equal. Order counts: [1, 2] !== [2, 1]
   *
   * @param  {Array}  a  Source input
   * @param  {Array}  b  Other source input
   *
   * @returns  {boolean}
   */
  Array: (a, b) => {
    if (a.length !== b.length) {
      return false
    }

    for (let i = 0, length = a.length; i < length; i++) {
      if (!deepEqual(a[i])(b[i])) {
        return false
      }
    }

    return true
  },

  /**
   * Determine if 2 objects are equal
   *
   * @param  {Object}  a  Source input
   * @param  {Object}  b  Other source input
   *
   * @returns  {boolean}
   */
  Object: (a, b) => {
    const aliceEntries = Object.entries(a)
    const bobEntries = Object.entries(b)

    if (aliceEntries.length !== bobEntries.length) {
      return false
    }

    for (let i = 0, length = aliceEntries.length; i < length; i++) {
      const [aliceKey, aliceValue] = aliceEntries[i]

      if (!deepEqual(b[aliceKey])(aliceValue)) {
        return false
      }
    }

    return true
  },

  /**
   * Determine if 2 regular expressions are equal
   *
   * @param  {RegExp}  a  Source input
   * @param  {RegExp}  b  Other source input
   *
   * @returns  {boolean}
   */
  RegExp: (a, b) => a.toString() === b.toString(),

  /**
   * Shallow equal
   *
   * @param  {mixed}  a  Source input
   * @param  {mixed}  b  Other source input
   *
   * @returns  {boolean}
   */
  Primitive: (a, b) => a === b,
}

/**
 * Determine a variable's type. Looks only for Array, Object and RegExp.
 * Everything else are "Primitive"
 *
 * Not using `../type/type.js` added ~300k ops/sec
 *
 * @param  {mixed}  source  The source
 *
 * @returns  {string}
 */
const type = source =>
  Array.isArray(source)
    ? "Array"
    : source instanceof RegExp
    ? "RegExp"
    : source instanceof Object
    ? "Object"
    : "Primitive"

/**
 * Determine if two variables are structurally equal (callable curried or
 * uncurried)
 *
 * @name       deepEqual
 * @tag        Core
 * @signature  (a: any, b: any): boolean
 * @see        {@link clone}
 *
 * @param  {any}  a  Source input
 * @param  {any}  b  Other source input
 *
 * @returns {boolean} True if inputs are deeply equal, false otherwise
 *
 * @example
 * deepEqual(
 *   { b: 3, a: 2 },
 *   { a: 2, b: 3 }
 * )
 * // => true
 *
 * deepEqual(
 *   { a :[1, 2] }
 * )(
 *   { a: [2, 1] }
 * )
 * // => false
 */
const deepEqual = a => b => {
  // added 100k ops/sec
  if (a === b) {
    return true
  }

  const aliceType = type(a)
  const bobType = type(b)

  if (aliceType !== bobType) {
    return false
  }

  return byType[aliceType](a, b)
}

export { deepEqual }
