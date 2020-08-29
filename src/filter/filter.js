import { isMatch } from "../is-match/is-match"

/**
 * Filter elements matching a predicate
 *
 * @param  {Function}  fn  Predicate functions
 *
 * @return {Array}
 *
 * @name filter
 * @tag Array
 * @signature (fn: Function) => (source: Array): Array
 * @signature (fn: Function, source: Array): Array
 */
const filter = fn => source => {
  const result = []
  const sourceArray = Array.isArray(source) ? source : [source]

  for (let i = 0, length = sourceArray.length; i < length; i++) {
    if (fn.call(null, sourceArray[i]) === true) {
      result.push(sourceArray[i])
    }
  }

  return result
}

/**
 * Filter elements matching an object
 *
 * @param  {Object}  subset  The function
 *
 * @return {Array}
 *
 * @name filterWith
 * @tag Array
 * @signature (subset: Object) => (source: Array): Array
 * @signature (subset: Object, source: Array): Array
 */
const filterWith = subset => filter(isMatch(subset))

export { filter, filterWith }
