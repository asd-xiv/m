/* eslint-disable no-sync */

const benchmark = require( "benchmark" )
const path = require( "path" )
const fs = require( "fs" )

const find = require( "./find" )

/**
 * Recursive dir walk with regular expression matching on file name
 *
 * @param      {RegExp}    regExp  Match file name against
 * @param      {string[]}  acc     Filelist accumulator
 * @return     {string[]}  Array of files paths
 */
const findFiles = ( regExp = /.*\.test\.js/ ) => {
  const scan = ( dirPath = "./", acc = [] ) => {
    fs.readdirSync( dirPath ).forEach( file => {
      const filePath = path.join( dirPath, file )

      if ( fs.statSync( filePath ).isDirectory() ) {
        scan( filePath, acc )
      } else if ( regExp.test( path.basename( filePath ) ) ) {
        acc.push( path.resolve( filePath ) )
      }
    } )

    return acc
  }

  return scan
}

new benchmark.Suite()
  .add( "#non-functional", () => {
    findFiles()( "./src" )
  } )
  .add( "#functional", () => {
    find( {
      test: /.*\.test\.js/,
    } )( "./src" )
  } )
  .on( "cycle", event => {
    console.log( String( event.target ) )
  } )
  .on( "complete", function onComplete () {
    console.log( `Fastest is ${this.filter( "fastest" ).map( "name" )}` )
  } )
  .run( {
    async: false,
  } )
