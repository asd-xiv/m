/**
 * Generate random number between interval
 *
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 *
 * @returns {Integer}
 */
export const random = (min = 0, max = 1) =>
  Math.floor(min + Math.random() * (max - min + 1))
