const test = require("tape")
const find = require("./find")

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
test("fs::find( { test, isAbsolute } )( folder ): string[]", t => {
  const files = find({
    test: /.*\.test\.js/,
  })(__dirname)

  t.equal(
    files.length,
    1,
    'folder should contain 1 file that ends with ".test.js"'
  )

  t.notEqual(
    files[0].indexOf(".test.js"),
    -1,
    'file name should match ".test.js"'
  )

  t.end()
})
