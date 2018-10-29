const test = require("tape")
const forEach = require("./for-each")

/**
 * Call `fn` over each element of an array
 *
 * @param  {Function}   fn      Function
 * @param  {Array}      source  Source array
 *
 * @return {undefined}
 *
 * @tag Array
 * @signature (fn: Function) => (source: Array): undefined
 */
test("array::forEach", t => {
  const tmp = []

  forEach(elm => tmp.push(elm))([1, 2, 3])
  t.deepEqual(tmp, [1, 2, 3], "Run function over each element of array")

  t.end()
})
