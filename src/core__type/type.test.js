const test = require("tape")
const type = require("./type")

/**
 * From ramda: Gives a single-word string description of the (native) type of
 * a value, returning such answers as "Object", "Number", "Array", or "Null".
 *
 * Does not attempt to distinguish user Object types any further, reporting
 * them all as "Object".
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
test("core::type( input ): string", t => {
  t.equal(type(null), "Null", "null should equal Null")
  t.equal(type(undefined), "Undefined", "undefined should equal Undefined")
  t.equal(type(NaN), "Number", "NaN should equal Number")
  t.equal(type(false), "Boolean", "false should equal Boolean")
  t.equal(type(2), "Number", "2 should equal Number")
  t.equal(type(""), "String", '"" should equal String')
  t.equal(type([]), "Array", "[] should equal Array")
  t.equal(type({}), "Object", "{} should equal Object")
  t.equal(type(new Date()), "Date", "new Date() should equal Date")
  t.equal(type(() => {}), "Function", "() => {} should equal Function")
  t.equal(type(/[A-z]/), "RegExp", "/[A-z]/ should equal RegExp")
  t.equal(
    type(Promise.resolve(2)),
    "Promise",
    "Promise.resolve(2) should equal Promise"
  )
  t.end()
})
