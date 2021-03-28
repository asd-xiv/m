import { is } from "../is/is"

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
 */
export const spy = (props = {}) => (...source) => {
  if (source.length > 1) {
    throw new Error(
      `@asd14/m/spy - Can only be called with 1 parameter, received ${source.length}`
    )
  }

  const { description = "@asd14/m/spy", transform } = props

  const spyValue = is(transform) ? transform(source[0]) : source[0]

  console.log()
  console.log(`// ${description}`)
  console.log()

  /* eslint-disable unicorn/no-null */
  console.log(JSON.stringify(spyValue, null, 2))

  // Make sure we're just proxying input
  return source[0]
}
