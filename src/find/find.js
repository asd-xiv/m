/**
 * Find the first element that satisfies the matchFn
 *
 * @param  {Function}    matchFn Function applied to each element
 * @param  {Array}       source  Source array
 *
 * @return {mixed|undefined}  First element
 *
 * @example
 */
module.exports = matchFn => source => {
  for (let i = 0, length = source.length; i < length; i++) {
    const found = matchFn(source[i], i, source)

    if (found === true) {
      return source[i]
    }
  }

  return undefined
}
