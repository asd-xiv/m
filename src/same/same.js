/**
 * Curried funtion that always returns the same parameter
 *
 * @param {any} source Something, anything
 *
 * @returns {any}
 */
const same = source => () => source

export { same }
