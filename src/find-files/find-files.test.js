const test = require("tape")
const findFiles = require("./find-files")
const endsWith = require("../ends-with/ends-with")

/**
 * Recursive dir walk with regular expression matching on file name
 *
 * @param  {Object}           arg1             Function props
 * @param  {Function|RegExp}  arg1.test        Test function or RegExp to match
 *                                             file name agains
 * @param  {boolean}          arg1.isAbsolute  With absolute paths
 *
 * @return {string[]}         Array of files paths
 */
test("fs::find", t => {
  const files = findFiles({
    test: /.*\.test\.js/,
  })(__dirname)

  t.equals(files.length, 1, "Find files using regexp filter")

  t.equals(
    endsWith(".test.js")(files[0]),
    true,
    'File name should match ".test.js"'
  )

  const filesByFunction = findFiles({
    test: endsWith(".test.js"),
  })(__dirname)

  t.equals(
    endsWith(".test.js")(filesByFunction[0]),
    true,
    "Find files using filter function"
  )

  t.end()
})
