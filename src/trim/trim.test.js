import test from "tape"

import { trim } from "./trim"

test("trim", t => {
  t.equals(trim()(" lorem  "), "lorem", "Remove white space - curried")

  t.equals(trim(" ", " lorem  "), "lorem", "Remove white space - uncurried")

  t.equals(trim("-")("-- lorem  -"), " lorem  ", "Remove custom char")

  t.end()
})
