import { type } from "../type/type.js"
import { _parseTimerOptions } from "../utils/parse-timer-options.js"

type ThrottleOptions = {
  /** Milliseconds between runs of `fn`, at most 2,147,483,647, default `50` */
  wait?: number
  /** Drops the call waiting for the window end when aborted, and makes later calls do nothing */
  signal?: AbortSignal
  /** Run `fn` once more at the end of the window for a dropped call, default `false` */
  hasLastCall?: boolean
}

type ThrottleFn = {
  <P extends unknown[]>(
    options: ThrottleOptions,
    fn: (...params: P) => unknown
  ): (...params: P) => void
  <P extends unknown[]>(fn: (...params: P) => unknown): (...params: P) => void
}

const _throttle = (
  fn: (...params: unknown[]) => unknown,
  wait: number,
  hasLastCall: boolean,
  signal: AbortSignal | undefined
): ((...params: unknown[]) => void) => {
  // The window opens when fn runs, and closes when its timer fires. No clock
  // is read, so a wall clock that steps back cannot stretch the window
  let windowTimer: ReturnType<typeof setTimeout> | undefined
  // The last call the window dropped, run when the window closes
  let lastParams: unknown[] | undefined

  const run = (params: unknown[]): void => {
    fn(...params)

    // With no wait, every call runs: a 0 ms window would still drop the
    // calls made before the next task
    if (wait > 0) {
      windowTimer = setTimeout(() => {
        windowTimer = undefined

        if (lastParams) {
          const params = lastParams

          lastParams = undefined
          run(params)
        }
      }, wait)
    }
  }

  signal?.addEventListener(
    "abort",
    () => {
      clearTimeout(windowTimer)
      windowTimer = undefined
      lastParams = undefined
    },
    { once: true }
  )

  return (...params: unknown[]) => {
    if (signal?.aborted) {
      return
    }

    if (windowTimer === undefined) {
      run(params)
    } else if (hasLastCall) {
      lastParams = params
    }
  }
}

/**
 * Create a wrapper function that runs `fn` at most once every `wait`
 * milliseconds, however often it is called. The first call runs at once.
 * `wait` counts from one run to the next, not from the last call: for a delay
 * that restarts at each call, use {@link debounce}.
 *
 * With `hasLastCall`, a call the window dropped runs at the end of the window,
 * with the params of the latest dropped call. A single call runs `fn` once.
 *
 * Options go only in the two-argument form. With one argument, `throttle`
 * waits 50 ms and has no last call.
 *
 * @param {Object} [options] - { wait: number, hasLastCall: boolean }
 * @param {Function} fn - Function to limit
 *
 * @returns {Function} Wrapper that takes the params of `fn` and returns nothing
 *
 * @example
 * const onMove = throttle(position => draw(position))
 * onMove(1)
 * onMove(2)
 * // draw(1) runs, draw(2) is dropped
 *
 * const onScroll = throttle({ wait: 100, hasLastCall: true }, update)
 * onScroll(1)
 * onScroll(2)
 * // update(1) runs now, update(2) runs 100 ms later
 *
 * // Abort with a signal: the call waiting for the window end never runs, and
 * // later calls do nothing. The same signal removes the listener
 * const controller = new AbortController()
 * const onResize = throttle({ wait: 100, signal: controller.signal }, layout)
 *
 * window.addEventListener("resize", onResize, { signal: controller.signal })
 * controller.abort()
 *
 * @name throttle
 * @tag Function
 *
 * @see {@link debounce}
 */
const throttle = ((...params: unknown[]) => {
  const fn = params[params.length - 1]
  const { options, wait, signal } = _parseTimerOptions(
    params.length > 1 ? params[0] : undefined,
    { fnName: "throttle" }
  )
  const { hasLastCall = false } = options

  if (typeof hasLastCall !== "boolean") {
    throw new TypeError(
      `@asd14/m/throttle: expected 'hasLastCall' to be 'Boolean', got '${type(hasLastCall)}'`
    )
  }

  if (typeof fn !== "function") {
    throw new TypeError(
      `@asd14/m/throttle: expected 'fn' to be 'Function', got '${type(fn)}'`
    )
  }

  return _throttle(
    fn as (...params: unknown[]) => unknown,
    wait,
    hasLastCall,
    signal
  )
}) as ThrottleFn

export { throttle }
export type { ThrottleFn, ThrottleOptions }
