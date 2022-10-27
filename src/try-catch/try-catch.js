/**
 * Replicate try/catch using a tryer and catcher function
 *
 * @param {Function} tryer   Try to do something with source input
 * @param {Function} catcher Run if tryer throws exception
 *
 * @returns {any}
 *
 * @tag Core
 *
 * @example
 * tryCatch(inc)(10)
 * // => 11
 *
 * tryCatch(
 *   () => { throw new Error("Tryer error") },
 *   (error, source) => inc(source)
 * )(10)
 * // => 11
 */
const tryCatch =
  (tryer, catcher) =>
  (...input) => {
    try {
      return tryer(...input)
    } catch (error) {
      return catcher(error, ...input)
    }
  }

export { tryCatch }
