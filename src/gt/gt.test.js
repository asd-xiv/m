const test = require("tape")
const gt = require("./gt")

/**
 * Grater compare
 *
 * @param  {number}  first   First number
 * @param  {number}  second  Second number
 *
 * @return {boolean}
 *
 * @tag Core
 * @signarute (first: number) => (second: number): boolean
 *
 * @example
 * gt(4)(10)
 * // => false
 * gt(14)(10)
 * // => true
 */
test("core::gt", t => {
  t.equals(gt(4)(10), false, "4 is not grater than 10")
  t.equals(gt(10)(10), false, "10 is not grater than 10")
  t.equals(gt(14)(10), true, "14 is grater than 10")

  t.end()
})
