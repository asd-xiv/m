/* eslint-disable unicorn/prefer-module */

import test from "tape"
import { createRequire } from "module"

test("index", t => {
  t.doesNotThrow(() => {
    createRequire(new URL("./index.js", import.meta.url))
  }, "Main file loads without errors")

  t.end()
})
