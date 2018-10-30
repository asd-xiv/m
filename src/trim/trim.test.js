const test = require("tape")
const trim = require("./trim")

/**
 * Remove char from beginning and end of string
 *
 * @param  {string}  char    Character to be removed
 * @param  {string}  source  Source string
 *
 * @return {string}
 *
 * @tag String
 * @signature (char: string) => (source: string): string
 *
 * @example
 * trim()(" lorem  ")
 * // => "lorem"
 * trim("-")("-- lorem  --")
 * // => " lorem  "
 */
test("string::trim", t => {
  t.equals(trim()(" lorem  "), "lorem", "Remove default white space")

  t.equals(trim("-")("-- lorem  --"), " lorem  ", "Remove custom char")

  t.equals(trim()(trim()(" lorem  ")), "lorem", "Idempotent")

  t.end()
})
