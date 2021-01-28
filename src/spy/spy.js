/**
 * Proxy input and print to console.log. Usefull for debugging pipe chains.
 *
 * @param {string} namespace
 * @param {any}    source
 *
 * @returns {any}
 *
 * @name      spy
 * @tag       Other
 * @signature (namespace: string) => (source: any): any
 *
 * @example
 */
export const spy = namespace => (...source) => {
  if (source.length > 1) {
    throw new Error(
      `m:spy - Can only be called with 1 parameter, received ${source.length}`
    )
  }

  console.log(`m:spy:${namespace}`, JSON.stringify(source[0]))

  return source[0]
}
