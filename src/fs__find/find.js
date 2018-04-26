/* eslint-disable no-sync */

const path = require( "path" )
const fs = require( "fs" )
const pipe = require( "../core__pipe/pipe" )
const map = require( "../array__map/map" )
const push = require( "../array__push/push" )
const flatten = require( "../array__flatten/flatten" )
const reduce = require( "../array__reduce/reduce" )
const type = require( "../core__type/type" )

/**
 * Determines if file name valid.
 *
 * @param  {Function|RegExp}   match  The match
 *
 * @return {boolean}  True if file name valid, False otherwise.
 */
const isFileNameValid = match => fileName => {
  const byType = {
    Function: () => match.call( null, fileName ),
    RegExp  : () => match.test( fileName ),
  }

  return byType[ type( match ) ]()
}

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
    map( file => path.resolve( dir, file ) )
  )( dir )

/**
 * Determines if dir.
 *
 * @param  {string}   dirPath  The dir path
 *
 * @return {boolean}  True if dir, False otherwise.
 */
const isDir = dirPath =>
  fs.statSync( dirPath ).isDirectory()

/**
 * Recursive dir walk with regular expression matching on file name
 *
 * @param  {Object}           arg1             Function props
 * @param  {Function|RegExp}  arg1.test        Test function or RegExp to match
 *                                             file name agains
 * @return {string[]}         Array of files paths
 */
module.exports = ( { test = /.*/ } = {} ) => {
  const matchInDir = pipe(
    readDir,
    reduce( ( acc, filePath ) =>
      isDir( filePath )
        ? push( matchInDir( filePath ) )( acc )
        : isFileNameValid( test )( path.basename( filePath ) )
          ? push( filePath )( acc )
          : acc,
    [] ),
  )

  return pipe(
    matchInDir,
    flatten
  )
}
