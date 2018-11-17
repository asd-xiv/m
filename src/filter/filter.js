/**
 * Remove elements that dont match based on custom function
 *
 * @param  {Function}  fn  The function
 *
 * @return {Array}
 *
 * @tag Array
 * @signature (fn: Function) => (source: Array): Array
 */
module.exports = fn => source => {
  const result = []
  const sourceArray = Array.isArray(source) ? source : [source]

  for (let i = 0, length = sourceArray.length; i < length; i++) {
    if (fn.call(null, sourceArray[i]) === true) {
      result.push(sourceArray[i])
    }
  }

  return result
}
