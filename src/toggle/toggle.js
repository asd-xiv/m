import { when } from "../when/when"
import { any } from "../any/any"
import { remove } from "../remove/remove"
import { push } from "../push/push"

/**
 * Add element if not exists, remove otherwise
 *
 * @param {mixed} element Toggable value
 *
 * @returns {Array}
 *
 * @tag Array
 * @signature (element: mixed) => (source: Array): Array
 *
 * @example
 * toggle(1)([1, 2])
 * // => [2]
 *
 * toggle(1)([2])
 * // => [1, 2]
 */
const toggle = element => source => {
  if (source.length === 0) {
    return [element]
  }

  return when(any(element), remove(element), push(element))(source)
}

export { toggle }
