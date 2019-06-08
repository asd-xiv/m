import { isMatch } from "../is-match/is-match"

/**
 * Find the first element that satisfies the matchFn
 *
 * @param  {Function}  fn      Function applied to each element
 * @param  {Array}     source  Source array
 *
 * @return {mixed|undefined}  First element
 *
 * @example
 */
const find = fn => source => {
  for (let i = 0, length = source.length; i < length; i++) {
    const isFound = fn(source[i], i, source)

    if (isFound === true) {
      return source[i]
    }
  }

  return undefined
}

const findWith = subset => find(isMatch(subset))

export { find, findWith }
