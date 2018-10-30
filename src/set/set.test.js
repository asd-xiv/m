const test = require("tape")
const set = require("./set")

/**
 * Shallow clone of an object, setting or overriding a property with the given
 * value
 *
 * @param      {string}  key     Property name
 * @param      {mixed}   value   Property value
 * @param      {Object}  source  Source object
 *
 * @return     {Object}
 *
 * @tag Object
 * @signature ( key: string, value: mixed ) => ( source: Object ): Object
 *
 * @example
 * set( "a", "lorem" )( { b: "ipsum" } )
 * // => { a: "lorem", b: "ipsum" }
 */
test("object::set( key: string, value: mixed ) => ( source: Object ): Object", t => {
  const source = { lorem: "ipsum" }

  t.deepEqual(
    set("lorem", "42")(source),
    { lorem: "42" },
    "Set existing property overwrites value"
  )

  t.deepEqual(
    set("dolor", 42)(source),
    { lorem: "ipsum", dolor: 42 },
    "Set non-existing property"
  )

  t.notEqual(
    set("lorem", "ipsum")(source),
    source,
    "Result object is a new object (shallow clone)"
  )

  t.end()
})
