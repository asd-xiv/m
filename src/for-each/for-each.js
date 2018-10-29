/**
 * Call `fn` over each element of an array
 *
 * @param  {Function}   fn      Function
 * @param  {Array}      source  Source array
 *
 * @return {undefined}
 *
 * @tag Array
 * @signature (fn: Function) => (source: Array): undefined
 */
module.exports = fn => source => {
  for (let i = 0, length = source.length; i < length; i++) {
    fn.call(null, source[i], i, source)
  }
}
