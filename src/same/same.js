/**
 * Curried funtion that always returns the input given
 *
 * @param {any} source Something, anything
 *
 * @returns {any}
 */
export const same = source => () => source
