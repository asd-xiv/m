import test from "tape"
import { lt } from ".."

/**
 * Less compare
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
 * lt(4)(10)
 * // => true
 * lt(14)(10)
 * // => false
 */
test("lt", t => {
  t.equals(lt(14)(10), false, "14 is not less than 10")
  t.equals(lt(10)(10), false, "10 is not less than 10")
  t.equals(lt(4)(10), true, "4 is less than 10")

  t.end()
})
