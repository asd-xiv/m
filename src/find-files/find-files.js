/* eslint-disable no-sync */

const path = require("path")
const fs = require("fs")
const pipe = require("../pipe/pipe")
const map = require("../map/map")
const push = require("../push/push")
const flatten = require("../flatten/flatten")
const reduce = require("../reduce/reduce")

/**
 * Determines if file name valid.
 *
 * @param  {Function|RegExp}   match  The match
 *
 * @return {boolean}  True if file name valid, False otherwise.
 */
const isFileNameValid = match => fileName =>
  typeof match === "function"
    ? match.call(null, fileName)
    : match.test(fileName)

/**
 * Reads a folder contents
 *
 * @param  {String}    dir  The dir path
 *
 * @return {string[]}  Array of files paths
 */
const readDir = dir =>
  pipe(
    fs.readdirSync,
    map(file => path.resolve(dir, file))
  )(dir)

/**
 * Determines if dir.
 *
 * @param  {string}   dirPath  The dir path
 *
 * @return {boolean}  True if dir, False otherwise.
 */
const isDir = dirPath => fs.statSync(dirPath).isDirectory()

/**
 * Recursive dir walk with regular expression matching on file name
 *
 * @param  {Object}           arg1             Function props
 * @param  {Function|RegExp}  arg1.test        Test function or RegExp to match
 *                                             file name agains
 * @return {string[]}         Array of files paths
 *
 * @example
 * find({test: /*.\.plugin\.js/})("./root-folder")
 */

const matchInFolder = test =>
  pipe(
    readDir,
    reduce(
      (acc, filePath) =>
        isDir(filePath)
          ? [...acc, ...matchInFolder(test)(filePath)]
          : isFileNameValid(test)(path.basename(filePath))
          ? push(filePath)(acc)
          : acc,
      []
    )
  )

module.exports = (test = /.*/) =>
  pipe(
    map(matchInFolder(test)),
    flatten
  )
