/* eslint-disable no-use-before-define */

const byType = {
  /**
   * Determine if 2 arrays are equal. Order counts: [1,2] !== [2,1]
   *
   * @param  {Array}   alice  Source input
   * @param  {Array}   bob    Other source input
   *
   * @return {boolean}
   */
  Array: (alice, bob) => {
    if (alice.length !== bob.length) {
      return false
    }

    for (let i = 0, length = alice.length; i < length; i++) {
      if (!deepEqual(alice[i])(bob[i])) {
        return false
      }
    }

    return true
  },

  /**
   * Determine if 2 objects are equal
   *
   * @param  {Object}   alice  Source input
   * @param  {Object}   bob    Other source input
   *
   * @return {boolean}
   */
  Object: (alice, bob) => {
    const aliceEntries = Object.entries(alice)
    const bobEntries = Object.entries(bob)

    if (aliceEntries.length !== bobEntries.length) {
      return false
    }

    for (let i = 0, length = aliceEntries.length; i < length; i++) {
      const [aliceKey, aliceValue] = aliceEntries[i]

      if (!deepEqual(bob[aliceKey])(aliceValue)) {
        return false
      }
    }

    return true
  },

  /**
   * Determine if 2 regular expressions are equal
   *
   * @param  {RegExp}   alice  Source input
   * @param  {RegExp}   bob    Other source input
   *
   * @return {boolean}
   */
  RegExp: (alice, bob) => alice.toString() === bob.toString(),

  /**
   * Shallow equal
   *
   * @param  {mixed}   alice  Source input
   * @param  {mixed}   bob    Other source input
   *
   * @return {boolean}
   */
  Primitive: (alice, bob) => alice === bob,
}

/**
 * Determine a variable's type. Looks only for Array, Object and RegExp.
 * Everything else are "Primitive"
 *
 * Not using `../type/type.js` added ~300k ops/sec
 *
 * @param  {mixed}   source  The source
 *
 * @return {string}
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
 * Determine if two variables are structurally equal.
 *
 * @param  {mixed}   alice  Source input
 * @param  {mixed}   bob    Other source input
 *
 * @return {boolean}
 */
const deepEqual = alice => bob => {
  // added 100k ops/sec
  if (alice === bob) {
    return true
  }

  const aliceType = type(alice)
  const bobType = type(bob)

  if (aliceType !== bobType) {
    return false
  }

  return byType[aliceType](alice, bob)
}

module.exports = deepEqual
