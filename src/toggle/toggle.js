const ifThen = require("../core__if-then/if-then")
const has = require("../has/has")
const remove = require("../array__remove/remove")
const push = require("../array__push/push")

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

  return ifThen(has(element), remove(element), push(element))(source)
}
