import { reduce } from "../reduce/reduce"
import { is, isNothing } from "../is/is"
import { when } from "../when/when"
import { pipe } from "../pipe/pipe"
import { same } from "../same/same"

/**
 * Get value from obj property
 *
 * @param  {string|string[]}  path          Property name or dot path of props
 * @param  {mixed}            defaultValue  Value to return if not found
 * @param  {object}           source        Source object
 *
 * @return {mixed}
 *
 * @tag Object
 * @signature (path: string|string[]) => (source: Object|Array): mixed
 *
 * @example
 * get("lorem")({ lorem: "ipsum" })
 * // => "ipsum"
 *
 * get("not-exist")({ lorem: "ipsum" })
 * // => undefined
 *
 * get("not-exist-with-default", "dolor")({ lorem: "ipsum" })
 * // => "dolor"
 *
 * get(["a", "b"])({ a: { b: "c" } })
 * // => "c"
 *
 * get(["a", "test"])({ a: { b: "c" } })
 * // => undefined
 */
const get = (path, defaultValue) => source => {
  if (is(source) && typeof source === "object") {
    return pipe(
      reduce(
        (acc, item) =>
          is(acc) && typeof acc === "object" ? acc[item] : undefined,
        source
      ),
      when(isNothing, same(defaultValue))
    )(Array.isArray(path) ? path : [path])
  }

  return undefined
}

export { get }
