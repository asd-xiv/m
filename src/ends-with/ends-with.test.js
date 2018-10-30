const test = require("tape")
const endsWith = require("./ends-with")

/**
 * Test if string ends with substring
 *
 * @param  {string}  search  Search string
 * @param  {string}  source  Source string
 *
 * @return {boolean}
 *
 * @tag String
 * @signature (search: string) => (source: string): boolean
 *
 * @example
 * endWith("ipsum")("lorem ipsum")
 * // => true
 */
test("string::endsWith", t => {
  t.equals(
    endsWith("ipsum")("lorem ipsum"),
    true,
    "Source string ends with search string"
  )

  t.equals(
    endsWith("lorem")("lorem ipsum"),
    false,
    "Search string exists but not at ending"
  )

  t.equals(
    endsWith("lorem ipsum dolor")("lorem ipsum"),
    false,
    "Search string is longer than source string"
  )

  t.equals(
    endsWith("asd")("lorem ipsum"),
    false,
    "Search string does not exist in source"
  )

  t.end()
})
