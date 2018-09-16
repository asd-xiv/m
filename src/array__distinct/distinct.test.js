const test = require( "tape" )
const distinct = require( "./distinct" )

/**
 * Remove repeating values
 *
 * @param  {Array}  source  The source
 *
 * @return {Array}
 *
 * @tag Array
 * @signature ( source: Array ): Array
 *
 * @example
 * distinct( [1, 1, 2] ) // => [1, 2]
 * distinct( [1, {a: 2}, {a: 2}] ) // => [1, {a: 2}]
 */
test( "array::distinct( source: Array ): Array", t => {
  t.deepEqual(
    distinct( [ 1, 1 ,3 ] ),
    [ 1,3 ],
    "Primitives: ([1, 1 ,3]) // => [1, 3]" )

  t.deepEqual(
    distinct( [ 1, "1" ,3 ] ),
    [ 1,"1",3 ],
    "Primitives: ([ 1, \"1\" ,3 ]) // => [ 1, \"1\" ,3 ]" )

  t.deepEqual(
    distinct( [ 1, { a: 2 }, { a: 2 } ] ),
    [ 1, { a: 2 } ],
    "Recursive: ([1, {a: 2}, {a: 2}]) // => [1, {a: 2}]" )

  t.end()
} )
