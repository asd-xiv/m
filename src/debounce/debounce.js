/**
 * Create a wrapper functions that is invoked only after some time since the last call.
 *
 * @param {Function} fn
 * @param {Object}   [props]
 * @param {number}   [props.wait=50] Time in milliseconds to wait until invoke
 *
 * @returns {Function} Wrapper function that calls `fn` after `wait` passed without calling
 *
 * @name debounce
 * @tag Core
 * @signature (fn: Function, { wait: number }): Function
 *
 * @example
 * const debouncedAutocomplete = debounce(autocompleteFromAPI, { wait: 100 })
 *
 * // render
 * <input onChange={debouncedAutocomplete} ... />
 */
const debounce = (fn, { wait = 50 } = {}) => {
  let finalRunTimer

  return (...params) => {
    // reset timer at every function call
    clearTimeout(finalRunTimer)

    finalRunTimer = setTimeout(() => {
      fn(...params)
    }, wait)
  }
}

export { debounce }
