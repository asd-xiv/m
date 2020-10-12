import { pipe } from "../pipe/pipe"
import { curry } from "../curry/curry"
import { all } from "../all/all"

const byValue = (shouldBe, value, not) =>
  not ? shouldBe !== value : shouldBe === value

const byFn = (shouldBe, value, not) => {
  const result = shouldBe(value) === true

  return not ? !result : result
}

const _isMatch = (subset, source) =>
  all(([key, _shouldBe]) => {
    const shouldBe = Array.isArray(_shouldBe) ? pipe(..._shouldBe) : _shouldBe
    const shouldTestNegation = key[0] === "!"
    const sourceKey = key.replace("!", "")
    const value = source[sourceKey]

    return typeof shouldBe === "function"
      ? byFn(shouldBe, value, shouldTestNegation)
      : byValue(shouldBe, value, shouldTestNegation)
  })(Object.entries(subset))

/**
 * Determines if one object's properties are equal to another
 *
 * @name   isMatch
 * @tag Core
 * @signature (subset: Object)(source: Object): boolean
 *
 * @param  {Object}   subset  Set of properties that should match
 * @param  {Object}   source  Object matching against
 *
 * @return {boolean}  True if all "subset" properties are of equal (shallow
 *                    compare) value to properties in "source" object,
 *                    otherwise false
 *
 * @example
 * isMatch({
 *  id: 2,
 *  parentId: null,
 * })({
 *  id: 2,
 *  parentId: null
 *  name: "John",
 * })
 * // true
 *
 * isMatch({
 *  "!parentId": null,
 *  "name": "John",
 * })({
 *  id: 2,
 *  parentId: null,
 *  name: "John",
 * })
 * // false
 */
export const isMatch = curry(_isMatch)
