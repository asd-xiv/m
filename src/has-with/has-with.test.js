const test = require("tape")
const hasWith = require("./has-with")

/**
 * Check if input has objects with certain properties
 *
 * @param  {Object}   filterObj  The filters
 * @param  {Array}    source     Source input array
 *
 * @return {boolean}
 *
 * @tag Array
 * @signature (filterObj: Object) => (source: Array): boolean
 *
 * @example
 * hasWith( { id: 2 } )( [ { id: 2, title: "todo #1"} ] )
 * // => true
 * hasWith( { id: 2 } )( [ { id: 3, title: "todo #2"} ] )
 * // => false
 */
test("array::hasWith", t => {
  t.equals(
    hasWith({ id: 2 })([{ id: 1 }, { id: 3 }]),
    false,
    "Array does not have an object with id = 2"
  )

  t.equals(
    hasWith({ id: 3 })([{ id: 1 }, { id: 3 }]),
    true,
    "Array has object with id = 3"
  )

  t.equals(hasWith({})([]), false, "Has value in empty array")

  t.end()
})
