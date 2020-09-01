/**
 * Generate random number between interval
 *
 * @param {Number} min Minimum value
 * @param {Number} max Maximum value
 *
 * @return {Integer}
 */
export const random = (min = 0, max = 1) =>
  Math.floor(min + Math.random() * (max - min + 1))
