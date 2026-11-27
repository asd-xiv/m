import type { PlainObject } from "../../types/object.js"
import { isPlainObject } from "../is/is.js"
import { type } from "../type/type.js"

// A timer stores its delay in 32 bits. Node and browsers run a larger delay,
// or Infinity, after 1 ms
const MAX_TIMER_DELAY = 2_147_483_647

const DEFAULT_WAIT = 50

type TimerOptions = {
  /** The options object, checked to be plain, for the options of one caller */
  options: PlainObject
  wait: number
  signal: AbortSignal | undefined
}

/**
 * Check the options that `debounce` and `throttle` share: `wait`, a delay a
 * timer can hold, and `signal`, an `AbortSignal`.
 *
 * @example
 * _parseTimerOptions({ wait: 300 }, { fnName: "debounce" })
 * // => { options: { wait: 300 }, wait: 300, signal: undefined }
 *
 * _parseTimerOptions({ wait: Infinity }, { fnName: "debounce" })
 * // throws "@asd14/m/debounce: expected 'wait' to be 'TimerDelay', got 'Infinity'"
 */
const _parseTimerOptions = (
  options: unknown,
  { fnName }: { fnName: string }
): TimerOptions => {
  if (options === undefined) {
    return { options: {}, wait: DEFAULT_WAIT, signal: undefined }
  }

  if (!isPlainObject(options)) {
    throw new TypeError(
      `@asd14/m/${fnName}: expected 'options' to be 'Object', got '${type(options)}'`
    )
  }

  const { wait = DEFAULT_WAIT, signal } = options

  if (typeof wait !== "number") {
    throw new TypeError(
      `@asd14/m/${fnName}: expected 'wait' to be 'Number', got '${type(wait)}'`
    )
  }

  if (!(wait >= 0 && wait <= MAX_TIMER_DELAY)) {
    throw new TypeError(
      `@asd14/m/${fnName}: expected 'wait' to be 'TimerDelay', got '${String(wait)}'`
    )
  }

  if (signal !== undefined && !(signal instanceof AbortSignal)) {
    throw new TypeError(
      `@asd14/m/${fnName}: expected 'signal' to be 'AbortSignal', got '${type(signal)}'`
    )
  }

  return { options, wait, signal }
}

export { _parseTimerOptions }
