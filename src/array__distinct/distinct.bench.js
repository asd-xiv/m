/* eslint-disable no-sync */

const Benchmark = require( "benchmark" )

const distinct = require( "./distinct" )
const { uniq: distinctR } = require( "ramda" )

const sourceA = [ 1, 2, 3, 3, 4 ]
const sourceB = [ 1, 2, [ { a: 2 } ], [ { a: 2 } ] ]

// lodash & underscore's uniq functions dont do deepEqual, only shallow

const suite1 = new Benchmark.Suite( {
  name: "Primitive duplicates",
} )
  .on( "start", bench => {
    console.log( `### ${bench.currentTarget.options.name} ###` )
  } )
  .on( "cycle", event => {
    console.log( String( event.target ) )
  } )
  .add( "- functies#distinct", () => {
    distinct( sourceA )
  } )
  .add( "- ramda#uniq", () => {
    distinctR( sourceA )
  } )

const suite2 = new Benchmark.Suite( {
  name: "Recursive with objects duplicates",
} )
  .on( "start", bench => {
    console.log( `### ${bench.currentTarget.options.name} ###` )
  } )
  .on( "cycle", event => {
    console.log( String( event.target ) )
  } )
  .add( "- functies#distinct", () => {
    distinct( sourceB )
  } )
  .add( "- ramda#uniq", () => {
    distinctR( sourceB )
  } )

suite1
  .run( {
    async: true,
  } )
  .on( "complete", () => {
    suite2.run( {
      async: true,
    } )
  } )
