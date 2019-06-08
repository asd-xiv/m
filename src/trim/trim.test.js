import test from "tape"
import { trim } from ".."

test("trim", t => {
  t.equals(trim()(" lorem  "), "lorem", "Remove default white space")

  t.equals(trim("-")("-- lorem  --"), " lorem  ", "Remove custom char")

  t.equals(trim()(trim()(" lorem  ")), "lorem", "Idempotent")

  t.end()
})
