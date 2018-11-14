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
test("fs::findFiles", t => {
  //
  const filesInFolder = findFiles()(__dirname)

  t.equals(filesInFolder.length, 5, "Find all files in folder")

  //
  const filesByRegExp = findFiles(/.*\.test\.js/)(__dirname)

  t.equals(filesByRegExp.length, 1, "Find files using regexp filter")

  t.equals(
    endsWith(".test.js")(filesByRegExp[0]),
    true,
    'Find all files matching ".test.js"'
  )

  //
  const filesByFunction = findFiles(endsWith(".test.js"))(__dirname)

  t.equals(
    endsWith(".test.js")(filesByFunction[0]),
    true,
    "Find files using filter function"
  )

  //
  const filesInMultipleFolders = findFiles(/dummy/)([
    `${__dirname}/dummy-test-folder`,
    `${__dirname}/dummy-test-folder-2`,
  ])

  t.equals(filesInMultipleFolders.length, 2, "Find files in multiple folders")

  t.end()
})
