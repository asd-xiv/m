/**
 * Curried funtion that always returns the input given
 *
 * @param {any} input Something, anything
 *
 * @returns {any}
 *
 * @example
 * same(42)() // => 42
 */
export const same = input => () => input
