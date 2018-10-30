const type = require("../type/type")

/**
 * Replace substring in string
 *
 * @param  {string}  oldString  The old string
 * @param  {string}  newString  The new string
 *
 * @return {string}
 */
const replaceString = (oldString, newString) => source =>
  "".replace.call(source, oldString, newString)

/**
 * Replace element in array (shallow equal)
 *
 * @param  {mixed}  oldElm  The old elm
 * @param  {mixed}  newElm  The new elm
 *
 * @return {Array}
 */
const replaceArray = (oldElm, newElm) => source => {
  const result = []

  for (let i = 0, length = source.length - 1; i <= length; i++) {
    if (oldElm === source[i]) {
      result.push(newElm)
    } else {
      result.push(source[i])
    }
  }

  return result
}

/**
 * Replace substring if source is string, replace element (shallow equal) if
 * source is Array
 *
 * @param {string|mixed}  oldElm  To be cloned
 * @param {string|mixed}  newElm  Copy of this object.
 * @param {string|Array}  source  Source array
 *
 * @return {string|Array}
 *
 * @tag String,Array
 * @signature (oldElm: string|mixed, newElm: string|mixed) => (source: Array): Array
 *
 */
module.exports = (oldElm, newElm) => source => {
  const sourceType = type(source)
  const byType = {
    String: replaceString,
    Array: replaceArray,
  }

  return byType[sourceType](oldElm, newElm)(source)
}
