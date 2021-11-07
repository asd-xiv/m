import { curry } from "../curry/curry.js"
import { when } from "../when/when.js"
import { any } from "../any/any.js"
import { remove } from "../remove/remove.js"
import { push } from "../push/push.js"

const _toggle = (element, input) => {
  if (input.length === 0) {
    return [element]
  }

  return when(any(element), remove(element), push(element), input)
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
