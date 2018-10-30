const test = require("tape")
const raise = require("./raise")

test("core::raise", t => {
  t.throws(
    () => raise(new Error("Exception raised by function")),
    /Exception raised by function/,
    "Exception raised by function"
  )

  t.end()
})
