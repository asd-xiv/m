import { is } from "../is/is.js"

/**
 * Proxy input and print to console.log. Useful for debugging pipe chains.
 *
 * @param {Object} props
 * @param {any}    source
 *
 * @returns {any}
 *
 * @name      spy
 * @tag       Other
 * @signature (...props: any) => (source: any): any
 *
 * @example
 * spy()([1, 2, 3])
 * // prints [1, 2, 3] in the console output
 */
export const spy =
  (props = {}) =>
  (...input) => {
    if (input.length > 1) {
      throw new Error(
        `@asd14/m/spy - Can only be called with 1 parameter, received ${input.length}`
      )
    }

    const { description = "@asd14/m/spy", transform } = props

    const spyValue = is(transform) ? transform(input[0]) : input[0]

    console.log()
    console.log(`// ${description}`)
    console.log()

    /* eslint-disable unicorn/no-null */
    console.log(JSON.stringify(spyValue, null, 2))

    // Make sure we're just proxying input
    return input[0]
  }
