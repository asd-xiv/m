const test = require("tape")
const hasKey = require("./has-key")

/**
 * Check if property exists on a given object
 *
 * @param  {string}  key     Property name
 * @param  {object}  source  Source object
 *
 * @return {boolean}
 *
 * @tag Object
 * @signature ( key: string ) => ( source: Object ): boolean
 *
 * @example
 * has( "lorem" )( { lorem: null } ) // => true
 * has( "toString" )( { lorem: "ipsum" } ) // => false
 */
test("object::has( key: string ) => ( input: Object ): boolean", t => {
  t.equal(hasKey("lorem")({ lorem: "ipsum" }), true, "Key exists")

  t.equal(hasKey("lorem")({}), false, "Key does not exist")

  t.equal(
    hasKey("toString")({}),
    false,
    'Prototype key "toString" does not return false-positive'
  )

  t.equal(
    hasKey("toString")(Object.create(null)),
    false,
    'Key "toString" does not exist on object without prototype'
  )

  t.equal(
    hasKey("lorem")({ lorem: undefined }),
    true,
    'Key exists when value is "undefined"'
  )

  t.equal(
    hasKey("lorem")({ lorem: NaN }),
    true,
    'Key exists when value is "NaN"'
  )

  t.equal(
    hasKey("lorem")({ lorem: null }),
    true,
    'Key exists when value is "null"'
  )

  t.equal(hasKey("lorem")({ lorem: 0 }), true, 'Key exists when value is "0"')

  t.end()
})
