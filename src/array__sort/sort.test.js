const test = require( "tape" )
const sort = require( "./sort" )

/**
 * Sort array using custom function
 *
 * @param  {Function}  fn      Sort function
 * @param  {Array}     source  Array
 *
 * @return {Array}
 *
 * @tag Array
 * @signature ( fn: Function ) => ( source: Array ): Array
 *
 * @example
 * sort((a,b) => a.id-b.id)([{id:2}, {id: 1}])
 * // => [{id:1}, {id: 2}]
 */
test( "array::sort( fn: Function ) => ( source: Array ): Array", t => {
  const source = [ { id: 2 }, { id: 1 } ]

  t.deepEqual(
    sort( ( a, b ) => a.id - b.id )( source ), [ { id: 1 }, { id: 2 } ],
    "Sort array of objects by field" )

  t.notEqual(
    sort( ( a, b ) => a.id - b.id )( source ), source,
    "Returned array is different (immutability)" )

  t.end()
} )
