import { sep } from "path"

import { trim } from "../trim/trim"
import { split } from "../split/split"
import { push } from "../push/push"
import { join } from "../join/join"
import { dropLast } from "../drop-last/drop-last"

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
const renameFile = newName => filePath =>
  filePath
  |> removeTrailingSlash
  |> split(sep)
  |> dropLast
  |> push(trim(sep)(newName))
  |> join(sep)

export { renameFile }
