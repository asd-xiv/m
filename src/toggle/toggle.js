const when = require("../when/when")
const has = require("../has/has")
const remove = require("../remove/remove")
const push = require("../push/push")

/**
 * Add element if not exists, remove otherwise
 *
 * @param  {mixed}  element  Toggable value
 *
 * @return {Array}
 *
 * @tag Array
 * @signature (element: mixed) => (source: Array): Array
 *
 * @example
 * toggle( 1 )( [ 1, 2 ] )
 * // => [ 2 ]
 * toggle( 1 )( [ 2 ] )
 * // => [ 1, 2 ]
 */
module.exports = element => source => {
  if (source.length === 0) {
    return [element]
  }

  return when(has(element), remove(element), push(element))(source)
}
