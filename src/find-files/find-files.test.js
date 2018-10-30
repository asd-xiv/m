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
  /**
   * Find all files
   */
  const allFiles = findFiles()(__dirname)

  t.equals(allFiles.length, 4, "Find all files in folder")

  /**
   * Find all .test.js files
   */
  const testFiles = findFiles({
    test: /.*\.test\.js/,
  })(__dirname)

  t.equals(testFiles.length, 1, "Find files using regexp filter")

  t.equals(
    endsWith(".test.js")(testFiles[0]),
    true,
    'File name should match ".test.js"'
  )

  /**
   * Find files using function
   */
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
