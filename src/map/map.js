/**
 * Iterate over an input list, calling `fn` for each element, return a new
 * array
 *
 * @param  {Function}  fn    The function
 * @param  {[]}        list  Array
 *
 * @return {Array}
 */
module.exports = (...fn) => source => {
  const result = []
  const sourceArray = Array.isArray(source) ? source : [source]

  for (let i = 0, valuesCount = sourceArray.length; i < valuesCount; i++) {
    let value = sourceArray[i]

    // pipe functions through each value
    for (let j = 0, fnCount = fn.length; j < fnCount; j++) {
      value = fn[j].call(null, value, i, sourceArray)
    }

    result.push(value)
  }

  return result
}
