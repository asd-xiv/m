const test = require("tape")

test("index", t => {
  t.doesNotThrow(() => {
    require(".")
  }, "Main file loads without errors")

  t.end()
})
