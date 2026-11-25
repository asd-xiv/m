import { isPlainObject } from "../is/is.js"
import { type } from "../type/type.js"

type DebounceOptions = {
  /** Milliseconds to wait after the last call, default `50` */
  wait?: number
}

type DebounceFn = {
  <P extends unknown[]>(
    options: DebounceOptions,
    fn: (...params: P) => unknown
  ): (...params: P) => void
  <P extends unknown[]>(fn: (...params: P) => unknown): (...params: P) => void
}

const _debounce = (
  fn: (...params: unknown[]) => unknown,
  wait: number
): ((...params: unknown[]) => void) => {
  let timer: ReturnType<typeof setTimeout> | undefined

  return (...params: unknown[]) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn(...params)
    }, wait)
  }
}

/**
 * Create a wrapper function that runs `fn` only after `wait` milliseconds pass
 * without a call. Each call restarts the wait, and `fn` gets the params of the
 * last call.
 *
 * Options go only in the two-argument form. With one argument, `debounce`
 * waits 50 ms.
 *
 * @param {Object} [options] - { wait: number }, default `50`
 * @param {Function} fn - Function to run after the calls stop
 *
 * @returns {Function} Wrapper that takes the params of `fn` and returns nothing
 *
 * @example
 * const search = debounce(query => fetchResults(query))
 * search("a")
 * search("ab")
 * // 50 ms later: fetchResults("ab") runs once
 *
 * const save = debounce({ wait: 100 }, saveDraft)
 * save(draft)
 * // 100 ms later: saveDraft(draft) runs
 *
 * @name debounce
 * @tag Function
 *
 * @see {@link throttle}
 */
const debounce = ((...params: unknown[]) => {
  const fn = params[params.length - 1]
  let wait = 50

  if (params.length > 1) {
    const options = params[0]

    if (!isPlainObject(options)) {
      throw new TypeError(
        `@asd14/m/debounce: expected 'options' to be 'Object', got '${type(options)}'`
      )
    }

    const optionWait = options["wait"]

    if (optionWait !== undefined) {
      if (typeof optionWait !== "number") {
        throw new TypeError(
          `@asd14/m/debounce: expected 'wait' to be 'Number', got '${type(optionWait)}'`
        )
      }

      if (!(optionWait >= 0)) {
        throw new TypeError(
          `@asd14/m/debounce: expected 'wait' to be 'NonNegative', got '${String(optionWait)}'`
        )
      }

      wait = optionWait
    }
  }

  if (typeof fn !== "function") {
    throw new TypeError(
      `@asd14/m/debounce: expected 'fn' to be 'Function', got '${type(fn)}'`
    )
  }

  return _debounce(fn as (...params: unknown[]) => unknown, wait)
}) as DebounceFn

export { debounce }
export type { DebounceFn, DebounceOptions }
