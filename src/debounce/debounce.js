/**
 * Call function after `wait` milliseconds have elapsed
 *
 * @name       debounce
 * @tag        Core
 * @signature  (fn: Function, { wait: number, bind: Object }): Function
 *
 * @param  {Function}  fn                 Source function
 * @param  {Object}    [props]            Properties
 * @param  {number}    [props.wait=50]    Time in milliseconds to wait without
 *                                        calling until invoke
 * @param  {Object}    [props.bind=null]  `this` provided for the call to `fn`
 *
 * @returns  {Function}  Wrapper function that calls `fn` after `wait`
 *                       passed without calling
 *
 * @example
 * // constructor
 * this.debouncedAutocomplete = debounce(autocompleteFromAPI, {
 *   wait: 100,
 *   bind: this
 * })
 *
 * // render
 * <input onChange={this.debouncedAutocomplete} ... />
 */
const debounce = (fn, { wait = 50, bind = null } = {}) => {
  let finalRunTimer

  return (...args) => {
    // reset timer at every function call
    clearTimeout(finalRunTimer)

    finalRunTimer = setTimeout(() => {
      fn.apply(bind, args)
    }, wait)
  }
}

export { debounce }
