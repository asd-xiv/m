/* eslint-disable unicorn/prefer-node-protocol */

import path from "path"

import { pipe } from "../pipe/pipe"
import { trim } from "../trim/trim"
import { split } from "../split/split"
import { push } from "../push/push"
import { unite } from "../unite/unite"
import { dropLast } from "../drop-last/drop-last"

const removeTrailingSlash = source =>
  source[source.length - 1] === path.sep ? source.slice(0, -1) : source

/**
 * Rename a file
 *
 * @param {string} newName New file name
 * @param {string} source  Absolute file path
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
