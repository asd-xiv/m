/**
 * { lambda_description }
 *
 * @param  {number}  count  The count
 *
 * @return {Array}   { description_of_the_return_value }
 */
const drop = count => source => {
  const result = []

  for (let i = 0, length = source.length - count; i < length; i++) {
    result.push(source[i])
  }

  return result
}

/**
 * Remove elements from end of array
 *
 * @param  {number|Array}  count   Number of element to remove
 * @param  {Array}         source  Source array
 *
 * @return {Array}
 *
 * @tag Array
 * @signature (count: number|Array) => (source: Array): Array
 */
module.exports = count => {
  if (Array.isArray(count)) {
    return drop(1)(count)
  }

  return drop(count)
}
