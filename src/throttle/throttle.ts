import { isPlainObject } from "../is/is.js"
import { type } from "../type/type.js"

type ThrottleOptions = {
  /** Milliseconds between runs of `fn`, default `50` */
  wait?: number
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
  hasLastCall: boolean
): ((...params: unknown[]) => void) => {
  let lastExecution = Date.now() - wait
  let timer: ReturnType<typeof setTimeout> | undefined

  return (...params: unknown[]) => {
    const now = Date.now()

    if (lastExecution + wait <= now) {
      clearTimeout(timer)
      timer = undefined
      lastExecution = now
      fn(...params)

      return
    }

    // The window dropped this call: run it at the end of the window
    if (hasLastCall) {
      clearTimeout(timer)

      timer = setTimeout(
        () => {
          timer = undefined
          lastExecution = Date.now()
          fn(...params)
        },
        lastExecution + wait - now
      )
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
 * @name throttle
 * @tag Function
 *
 * @see {@link debounce}
 */
const throttle = ((...params: unknown[]) => {
  const fn = params[params.length - 1]
  let wait = 50
  let hasLastCall = false

  if (params.length > 1) {
    const options = params[0]

    if (!isPlainObject(options)) {
      throw new TypeError(
        `@asd14/m/throttle: expected 'options' to be 'Object', got '${type(options)}'`
      )
    }

    const optionWait = options["wait"]
    const optionHasLastCall = options["hasLastCall"]

    if (optionWait !== undefined) {
      if (typeof optionWait !== "number") {
        throw new TypeError(
          `@asd14/m/throttle: expected 'wait' to be 'Number', got '${type(optionWait)}'`
        )
      }

      if (!(optionWait >= 0)) {
        throw new TypeError(
          `@asd14/m/throttle: expected 'wait' to be 'NonNegative', got '${String(optionWait)}'`
        )
      }

      wait = optionWait
    }

    if (optionHasLastCall !== undefined) {
      if (typeof optionHasLastCall !== "boolean") {
        throw new TypeError(
          `@asd14/m/throttle: expected 'hasLastCall' to be 'Boolean', got '${type(optionHasLastCall)}'`
        )
      }

      hasLastCall = optionHasLastCall
    }
  }

  if (typeof fn !== "function") {
    throw new TypeError(
      `@asd14/m/throttle: expected 'fn' to be 'Function', got '${type(fn)}'`
    )
  }

  return _throttle(fn as (...params: unknown[]) => unknown, wait, hasLastCall)
}) as ThrottleFn

export { throttle }
export type { ThrottleFn, ThrottleOptions }
