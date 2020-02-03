import { isMatch } from "../is-match/is-match"

/**
 * Find the first element that satisfies the matchFn
 *
 * @param  {Function} fn              Function applied to each element
 * @param  {Mixed}    notFoundDefault Return if no match found
 * @param  {Array}    source          Source array
 *
 * @return {mixed|undefined}  First element
 *
 * @example
 */
const find = (fn, notFoundDefault) => source => {
  for (let i = 0, length = source.length; i < length; i++) {
    const isFound = fn(source[i], i, source)

    if (isFound === true) {
      return source[i]
    }
  }

  return notFoundDefault
}

const findWith = (subset, notFoundDefault = {}) =>
  find(isMatch(subset), notFoundDefault)

export { find, findWith }
