import { isMatch } from "../is-match/is-match"

/**
 * Test if at least one element of array satisfies function
 *
 * @name       any
 * @tag        Core
 * @signature  (fn: Function) => (source: Array): boolean
 * @see        {@link isMatch}
 * @see        {@link all}
 * @see        {@link allWith}
 *
 * @param  {Function}  fn      Function to be satisfied
 * @param  {Array}     source  Input array
 *
 * @returns  {boolean}  True if at least one object passes, false otherwise
 *
 * @example
 * any(isNumber)([1, "string", NaN])
 * // => true
 *
 * any(is)([null])
 * // => false
 */
const any = fn => source =>
  (Array.isArray(source) ? source : [source]).some(element => {
    const testResult = fn(element)

    return testResult && typeof testResult === "boolean"
  })

/**
 * Test if object properties match any object in input array
 *
 * @name       anyWith
 * @tag        Core
 * @signature  (subset: Object) => (source: Object[]): boolean
 * @see        {@link any}
 * @see        {@link isMatch}
 * @see        {@link all}
 * @see        {@link allWith}
 *
 * @param  {Object}    subset  Set of properties that should match
 * @param  {Object[]}  source  Input array
 *
 * @returns  {boolean}  True if at least one object matches, false otherwise
 *
 * @example
 * anyWith({
 *   id: isNumber,
 *   name: "lorem",
 * })([
 *   { id: "uuid", name: "lorem" },
 *   { id: 2, name: "foo" },
 *   { id: 3, name: "lorem", foo: "bar" },
 * ])
 * // => true
 */
const anyWith = subset => any(isMatch(subset))

export { any, anyWith }
