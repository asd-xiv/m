/**
 * Proxy input and print to console.log. Useful for debugging pipe chains.
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

  const payload = source[0]
  const spied = [Object, Array].includes(payload.constructor) ? payload : JSON.stringify(payload)

  console.log(`m:spy:${namespace}`, spied)

  return payload
}
