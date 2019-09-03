import { reduce } from "../reduce/reduce"

const isObject = source => typeof source === "object" && source !== null

const fromObject = (source, key) =>
  source.hasOwnProperty(key) ? source[key] : undefined

/**
 * Get value from obj property
 *
 * @param  {string}  path    Property name or dot path of props
 * @param  {object}  source  Source object
 *
 * @return {mixed}
 *
 * @tag Object
 * @signature ( key: string ) => ( source: Object ): mixed
 *
 * @example
 * get( "lorem" )( { lorem: "ipsum" } ) // => "ipsum"
 * get( "not-exist" )( { lorem: "ipsum" } ) // => undefined
 * get( "a", "b" )( { a: { b: "c" } } ) // => "c"
 * get( "a", "test" )( { a: { b: "c" } } ) // => undefined
 */
const get = (...propsPath) => source =>
  isObject(source)
    ? reduce(
        (acc, item) => (isObject(acc) ? fromObject(acc, item) : undefined),
        source
      )(propsPath)
    : undefined

export { get }
