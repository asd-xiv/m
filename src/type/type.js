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
 *
 * type({})         // "Object"
 * type(1)          // "Number"
 * type(false)      // "Boolean"
 * type("s")        // "String"
 * type(null)       // "Null"
 * type(undefined)  // "Undefined"
 * type([])         // "Array"
 * type(/[A-z]/)    // "RegExp"
 * type(new Date()) // "Date"
 * type(() => {})   // "Function"
 */
const type = input =>
  input === null
    ? "Null"
    : input === undefined
      ? "Undefined"
      : Object.prototype.toString.call( input ).slice( 8, -1 )

/**
 * Determines something is empty
 *
 * @param   {Any}      input  Something to check if empty
 *
 * @return  {boolean}  True if empty, False otherwise
 *
 * @example
 *
 * isEmpty({})         // true
 * isEmpty(1)          // false
 * isEmpty(false)      // false
 * isEmpty("")         // true
 * isEmpty(null)       // true
 * isEmpty(undefined)  // true
 * isEmpty([])         // true
 * isEmpty(NaN)        // true
 * isEmpty(/[A-z]/)    // false
 * isEmpty(new Date()) // false
 * isEmpty(() => {})   // false
 */
const isEmpty = input => {
  const byType = {
    Null     : () => true,
    Undefined: () => true,
    Boolean  : () => false,
    Number   : () => Number.isNaN( input ),
    Function : () => false,
    RegExp   : () => false,
    Date     : () => false,
    String   : () => input === "",
    Array    : () => input.length === 0,
    Object   : () => Object.keys( input ).length === 0,
  }

  return byType[ type( input ) ]()
}

/**
 * Check if input is of a certain type
 *
 * @param  {string}   ofType  What type to check for
 * @param  {mixed}    input   Value to check
 *
 * @return {boolean}  If input is of type
 *
 * @example
 *
 * isType( "Function" )( 2 ) // false
 * isType( "Object" )( {} )  // true
 */
const isType = ofType => input =>
  type( input ) === ofType

/**
 * Determines if function
 *
 * @param  {mixed}   input  The input
 *
 * @return {boolean}  True if function, False otherwise.
 */
const isFn = input =>
  typeof input === "function"

/**
 * Determines if promise
 *
 * @param  {mixed}    input  The input
 *
 * @return {boolean}  True if promise, False otherwise.
 */
const isPromise = input =>
  type( input ) === "Promise"

/**
 * Determines if array
 *
 * @param  {mixed}    input  The input
 *
 * @return {boolean}  True if array, False otherwise.
 */
const isArray = Array.isArray

/**
 * Determines if is something
 *
 * @param  {mixed}    input  The input
 *
 * @return {boolean}  True if not null, undefined and NaN
 */
const is = input =>
  input !== null && input !== undefined && !Number.isNaN( input )

/**
 * Determines if not something
 *
 * @param  {mixed}    input  The input
 *
 * @return {boolean}  True if null, undefined or NaN
 */
const isNot = input =>
  input === null || input === undefined || Number.isNaN( input )

module.exports = {
  type,
  isEmpty,
  isType,
  isFn,
  isPromise,
  isArray,
  is,
  isNot,
}
