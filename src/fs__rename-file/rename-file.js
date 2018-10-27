const { sep } = require("path")

const trim = require("../string__trim/trim")
const split = require("../string__split/split")
const push = require("../array__push/push")
const join = require("../array__join/join")
const dropLast = require("../array__drop-last/drop-last")

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
