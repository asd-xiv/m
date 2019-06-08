import test from "tape"
import { push } from ".."

test("push", t => {
  t.deepEqual(push(null)([1]), [1, null], "(null)([]) should equal [null]")

  t.deepEqual(
    push(undefined)([]),
    [undefined],
    "(undefined)([]) should equal [undefined]"
  )

  t.deepEqual(push([])([]), [[]], "([])([]) should equal [[]]")

  t.deepEqual(
    push(1, null, undefined)([]),
    [1, null, undefined],
    "(1, null, undefined)([]) should equal [1, null, undefined]"
  )

  t.end()
})
