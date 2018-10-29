const test = require("tape")
const all = require("./all")
const is = require("../is/is")

const isEven = source => source % 2 === 0
const hasId = source => is(source.id)

/**
 * Test if all elements of array satisfy function
 *
 * @param {Function}  fn      Function that all elements need to satisfy
 * @param {Array}     source  Source array
 *
 * @return {boolea
 * n}
 *
 * @tag Core
 * @signature (fn: Function) => (source: Array): boolean
 *
 * @example
 * all(isNumber)([1, 2, 3])
 * // => true
 * all(is)([1, "asd", null])
 * // => false
 */
test("core::all", t => {
  t.equal(all(isEven)([1, 2, 3]), true, "Check all number are even")
  t.equal(
    all(hasId)([{}, { id: 2 }, {}]),
    false,
    'Check all elements have "id" property'
  )

  t.end()
})
