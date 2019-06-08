import test from "tape"
import { raise } from ".."

test("raise", t => {
  t.throws(
    () => raise(new Error("Exception raised by function")),
    /Exception raised by function/,
    "Exception raised by function"
  )

  t.end()
})
