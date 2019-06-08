/**
 * Generate random number between interval
 *
 * @param  {Object}   arg1      Props
 * @param  {number}   arg1.min  The minimum
 * @param  {number}   arg1.max  The maximum
 *
 * @return {integer}
 */
const random = ({ min, max }) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export { random }
