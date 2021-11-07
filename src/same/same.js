/**
 * Curried funtion that always returns the input given
 *
 * @param {any} input Something, anything
 *
 * @returns {any}
 */
export const same = input => () => input
