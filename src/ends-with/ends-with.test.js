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
    "Source string does end with search string"
  )

  t.equals(
    endsWith("lorem")("lorem ipsum"),
    false,
    "Source string does not end with search string"
  )

  t.end()
})
