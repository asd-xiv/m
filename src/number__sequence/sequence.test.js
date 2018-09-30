const test = require( "tape" )
const sequence = require( "./sequence" )

/**
 * Create an array of numbers between range
 *
 * @tag Number
 * @signature (step: number) => (start: number, end: number): number[]
 *
 * @param  {number}  step   The step
 * @param  {number}  start  Left side interval
 * @param  {number}  end    Right side interval
 *
 * @return {number[]}
 *
 * @example
 *
 * sequence(1)(1, 5)   // [1, 2, 3, 4, 5]
 * sequence(3)(1, 5)   // [1, 4]
 * sequence(-1)(2, -3) // [ 2, 1, 0, -1, -2, -3 ]
 */
test( "number::sequence(step: number) => (start: number, end: number): number[]", t => {

  t.throws(
    () => sequence( 0 )( 1, 10 ),
    /Invalid "step" value, must be non zero/,
    "Invalid \"step\" value, must be non zero" )

  t.throws(
    () => sequence( 1 )( 1, -10 ),
    /^Error: Invalid "step" value, if start > end then "step" must be negative/,
    "Invalid \"step\" value, if start > end then \"step\" must be negative" )

  t.throws(
    () => sequence( -1 )( 1, 10 ),
    /^Error: Invalid "step" value, if start < end then "step" must be positive/,
    "Invalid \"step\" value, if start < end then \"step\" must be positive" )

  t.deepEqual(
    sequence( 1 )( 1, 5 ),
    [ 1, 2, 3, 4, 5 ],
    "Create a sequence from 1 to 5 with step 1" )

  t.deepEqual(
    sequence( 3 )( 1, 5 ),
    [ 1, 4 ],
    "Create a sequence from 1 to 5 with step 3" )

  t.deepEqual(
    sequence( -1 )( 2, -3 ),
    [ 2, 1, 0, -1, -2, -3 ],
    "Create a sequence from 2 to -3 with step -1" )

  t.deepEqual(
    sequence( 1 )( -3, -2 ),
    [ -3, -2 ],
    "Create a sequence from -3 to -2 with step 1" )

  t.deepEqual(
    sequence( -2 )( -2, -5 ),
    [ -2, -4 ],
    "Create a sequence from -2 to -5 with step -2" )

  t.deepEqual(
    sequence( 2 )( -5, 5 ),
    [ -5, -3, -1, 1, 3, 5 ],
    "Create a sequence from -5 to 5 with step 2" )

  /*
   * 1. what to do if "step" is grater than "end"?
   * 2. should start & end always be included in resulting array?
   */

  t.end()
} )
