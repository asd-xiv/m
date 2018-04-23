/**
 * { function_description }
 *
 * @param  {mixed}  input  The input
 *
 * @return {mixed}
 */
const echo = input => {
  console.log( input )

  return input
}

/**
 * Identity function
 *
 * @param  {mixed}  input  The input
 *
 * @return {mixed}
 */
const I = input => () => input

module.exports = {
  echo,
  I,
}
