const test = require("tape")
const between = require("./between")

/**
 * Check if value is inside open or closed interval
 *
 * @param  {number}   left         Left limit
 * @param  {number}   right        Right limit
 * @param  {Object}   arg3         Props
 * @param  {boolean}  arg3.closed  If intervals is closed or not
 *
 * @return {boolean}
 *
 * @tag Number
 * @signature (left: number, right: number, props: Object)
 *  => (source: number): boolean
 *
 * @example
 * between(2, 5)(5)
 * // => false
 * between(2, 5, {closed: true})(5)
 * // => true
 */
test("between", t => {
  t.equals(between(2, 5)(3), true, "Number between default open interval")
  t.equals(between(2, 5)(5), false, "Number outside default open interval")

  t.equals(
    between(2, 5, { closed: true })(5),
    true,
    "Number between closed interval"
  )

  t.equals(
    between(2, 5, { closed: true })(1),
    false,
    "Number outside closed interval"
  )

  t.throws(
    () => between(5, 2)(1),
    /Left interval limit must be less than right limit/,
    "Left interval limit must be less than right limit"
  )

  t.end()
})
