/* eslint-disable unicorn/no-null */

import test from "tape"

import { clone } from "./clone"

test("clone", t => {
  /*
   * Primitives
   */
  t.equal(clone(null), null, "Clone null")
  t.equal(clone(), undefined, "Clone undefined")
  t.equal(clone(2), 2, "Clone number")
  t.equal(clone("3"), "3", "Clone number")
  t.equal(clone(true), true, "Clone boolean")

  /*
   * Date
   */
  const date = new Date(86400000)

  t.notEqual(clone(date), date, "Imutable date")
  t.equal(clone(date).getTime(), 86400000, "Clone date")

  /*
   * Array
   */
  const array = [1, 2, 3]

  t.notEqual(clone(array), array, "Imutable array")
  t.deepEqual(clone(array), [1, 2, 3], "Clone array")

  /*
   * Object
   */
  const object = { a: 1, b: 2, c: 3 }

  t.notEqual(clone(object), object, "Imutable array")
  t.deepEqual(clone(object), { a: 1, b: 2, c: 3 }, "Clone array")

  t.end()
})
