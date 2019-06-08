import { when } from "../when/when"
import { has } from "../has/has"
import { remove } from "../remove/remove"
import { push } from "../push/push"

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
const toggle = element => source => {
  if (source.length === 0) {
    return [element]
  }

  return when(has(element), remove(element), push(element))(source)
}

export { toggle }
