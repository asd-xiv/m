const byValue = ({ shouldBe, value, not }) =>
  not ? shouldBe !== value : shouldBe === value

const byFn = ({ shouldBe, value, not }) => {
  const result = shouldBe(value) === true

  return not ? !result : result
}

/**
 * Determines if one object's properties are equal to another
 *
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
 *
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
module.exports = subset => source => {
  const subsetEntries = Object.entries(subset)

  for (let i = 0, length = subsetEntries.length; i < length; i++) {
    const [key, shouldBe] = subsetEntries[i]
    const not = key[0] === "!"
    const cleanKey = key.replace("!", "")

    const isFieldMatch =
      typeof shouldBe === "function"
        ? byFn({ shouldBe, value: source[cleanKey], not })
        : byValue({ shouldBe, value: source[cleanKey], not })

    if (isFieldMatch === false) {
      return false
    }
  }

  return true
}
