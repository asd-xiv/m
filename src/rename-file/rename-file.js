const { sep } = require("path")

const trim = require("../trim/trim")
const split = require("../split/split")
const push = require("../push/push")
const join = require("../join/join")
const dropLast = require("../drop-last/drop-last")

const removeTrailingSlash = source =>
  source[source.length - 1] === sep ? source.slice(0, -1) : source

/**
 * Rename a file
 *
 * @param  {string}  newName   New file name
 * @param  {string}  filePath  Absolute file path
 *
 * @return {string}
 */
module.exports = newName => filePath =>
  filePath
  |> removeTrailingSlash
  |> split(sep)
  |> dropLast
  |> push(trim(sep)(newName))
  |> join(sep)
