/**
 * From ramda: Gives a single-word string description of the (native) type of
 * a value, returning such answers as "Object", "Number", "Array", or "Null".
 *
 * Does not attempt to distinguish user Object types any further, reporting
 * them all as "Object".
 *
 * @param {any} source Something to check type on
 *
 * @returns {string}
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
const type = source =>
  source === null
    ? "Null"
    : source === undefined
    ? "Undefined"
    : Object.prototype.toString.call(source).slice(8, -1)

export { type }
