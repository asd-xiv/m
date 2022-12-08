/* eslint-disable unicorn/prefer-node-protocol */

import path from "path"

import { pipe } from "../pipe/pipe.js"
import { trim } from "../trim/trim.js"
import { split } from "../split/split.js"
import { push } from "../push/push.js"
import { unite } from "../unite/unite.js"
import { dropLast } from "../drop-last/drop-last.js"

const removeTrailingSlash = input =>
  input[input.length - 1] === path.sep ? input.slice(0, -1) : input

/**
 * Rename a file
 *
 * @param {string} newName New file name
 *
 * @returns {function(string): string } a function of the absolute file path
 *
 * @example
 * renameFile("new-name.js", "/path/to/old-name.js")
 * // => "/path/to/new-name.js"
 */
const renameFile = newName =>
  pipe(
    removeTrailingSlash,
    split(path.sep),
    dropLast,
    push(trim(path.sep)(newName)),
    unite(path.sep)
  )

export { renameFile }
