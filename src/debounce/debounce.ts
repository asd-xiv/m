import { type } from "../type/type.js"
import { _parseTimerOptions } from "../utils/parse-timer-options.js"

type DebounceOptions = {
  /** Milliseconds to wait after the last call, at most 2,147,483,647, default `50` */
  wait?: number
  /** Drops the pending call when aborted, and makes later calls do nothing */
  signal?: AbortSignal
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
  wait: number,
  signal: AbortSignal | undefined
): ((...params: unknown[]) => void) => {
  let timer: ReturnType<typeof setTimeout> | undefined

  signal?.addEventListener(
    "abort",
    () => {
      clearTimeout(timer)
      timer = undefined
    },
    { once: true }
  )

  return (...params: unknown[]) => {
    if (signal?.aborted) {
      return
    }

    clearTimeout(timer)
    timer = setTimeout(() => {
      // Let go of the timer, and with it of `params`, once fn runs
      timer = undefined
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
 * // Abort with a signal, eg. when a React component unmounts: the pending
 * // call never runs, and later calls do nothing
 * useEffect(() => {
 *   const controller = new AbortController()
 *   const save = debounce({ wait: 300, signal: controller.signal }, saveDraft)
 *
 *   editor.on("change", save)
 *   return () => controller.abort()
 * }, [])
 *
 * @name debounce
 * @tag Function
 *
 * @see {@link throttle}
 */
const debounce = ((...params: unknown[]) => {
  const fn = params[params.length - 1]
  const { wait, signal } = _parseTimerOptions(
    params.length > 1 ? params[0] : undefined,
    { fnName: "debounce" }
  )

  if (typeof fn !== "function") {
    throw new TypeError(
      `@asd14/m/debounce: expected 'fn' to be 'Function', got '${type(fn)}'`
    )
  }

  return _debounce(fn as (...params: unknown[]) => unknown, wait, signal)
}) as DebounceFn

export { debounce }
export type { DebounceFn, DebounceOptions }
