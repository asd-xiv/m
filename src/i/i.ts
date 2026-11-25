/**
 * Identity function. Returns the input unchanged.
 *
 * Useful as a default pass-through, e.g. the else branch of {@link when}.
 *
 * @param {unknown} input - Any value
 *
 * @returns {unknown} The same value, unchanged
 *
 * @example
 * i(42)
 * // => 42
 *
 * when(isEqual(5), inc)(6)
 * // => 6 (uses identity internally for elseFn)
 *
 * @name i
 * @tag Any value
 *
 * @see {@link when}
 */
const i = <T>(input: T): T => input

export { i }
