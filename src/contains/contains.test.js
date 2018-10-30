const test = require("tape")
const contains = require("./contains")

/**
 * Test if string contains substring
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
 * contains("ipsum")("lorem ipsum")
 * // => true
 */
test("string::contains", t => {
  t.equals(
    contains("lorem")("lorem ipsum"),
    true,
    "Search string exists in source string"
  )

  t.equals(
    contains("loremx")("lorem ipsum"),
    false,
    "Search string does not exist in source string"
  )

  t.equals(
    contains("lorem ipsum very long dolor")("lorem ipsum"),
    false,
    "Search string longer than source string"
  )

  t.end()
})
