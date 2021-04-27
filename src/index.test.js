/* eslint-disable unicorn/prefer-module */

import test from "tape"

test("index", t => {
  t.doesNotThrow(() => {
    require(".")
  }, "Main file loads without errors")

  t.end()
})
