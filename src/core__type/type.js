/**
 * From ramda: Gives a single-word string description of the (native) type of
 * a value, returning such answers as "Object", "Number", "Array", or "Null".
 *
 * Does not attempt to distinguish user Object types any further, reporting
 * them all as "Object".
 *
 * @param {mixed}  input  Something to check type on
 *
 * @return {string}
 *
 * @example
 * type({})                // "Object"
 * type(1)                 // "Number"
 * type(false)             // "Boolean"
 * type("s")               // "String"
 * type(null)              // "Null"
 * type(undefined)         // "Undefined"
 * type([])                // "Array"
 * type(/[A-z]/)           // "RegExp"
 * type(new Date())        // "Date"
 * type(() => {})          // "Function"
 * type(Promise.resolve()) // "Promise"
 */
module.exports = input =>
  input === null ? "Null"
    : input === undefined ? "Undefined"
      : Object.prototype.toString.call( input ).slice( 8, -1 )
