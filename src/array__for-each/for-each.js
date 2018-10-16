/**
 * Iterate over an input array, calling `fn` for each element
 *
 * @param  {Function}   fn     Function
 * @param  {Array}      array  Input
 *
 * @return {undefined}  { description_of_the_return_value }
 */
module.exports = fn => array => {
  for (let i = 0, length = array.length; i < length; i++) {
    fn.call(null, array[i], i, array)
  }
}
