/* eslint-disable unicorn/no-null */

import test from "tape"
import { push } from "./push.js"

test("push", t => {
  t.deepEqual(push(null)([1]), [1, null], "(null)([]) should equal [null]")

  t.deepEqual(push()([]), [], "()([]) should equal []")

  t.deepEqual(push([])([]), [[]], "([])([]) should equal [[]]")

  t.deepEqual(
    push(1, undefined, null)([]),
    [1, undefined, null],
    "(1, undefined, null)([]) should equal [1, undefined, null]"
  )

  t.end()
})
