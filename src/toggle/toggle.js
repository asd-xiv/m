import { curry } from "../curry/curry"
import { when } from "../when/when"
import { any } from "../any/any"
import { remove } from "../remove/remove"
import { push } from "../push/push"

const _toggle = (element, source) => {
  if (source.length === 0) {
    return [element]
  }

  return when(any(element), remove(element), push(element), source)
}

/**
 * Add element if not exists, remove otherwise
 *
 * @param {any}   element
 * @param {Array} source
 *
 * @returns {Array}
 *
 * @name toggle
 * @tag Array
 * @signature (element: any) => (source: Array): Array
 *
 * @example
 * toggle(1)([1, 2])
 * // => [2]
 *
 * toggle(1, [2])
 * // => [1, 2]
 */
const toggle = curry(_toggle)

export { toggle }
