/**
 * Curried funtion that always returns the input given
 *
 * @param {any} source Something, anything
 *
 * @returns {any}
 */
const same = source => () => source

export { same }
