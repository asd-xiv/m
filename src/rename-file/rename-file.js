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
 * @param {string} input   Absolute file path
 *
 * @returns {string}
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
