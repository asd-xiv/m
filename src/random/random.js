/**
 * Generate random number between interval
 *
 * @param {Number} min Minimum value
 * @param {Number} max Maximum value
 *
 * @return {Integer}
 */
export const random = (min, max) =>
  Math.floor(min+ Math.random() * (max - min + 1))
