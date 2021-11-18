import test from "tape"

import { toUpper } from "./to-upper.js"

test("toUpper", t => {
  const input = "Lorem Opsum"

  t.equals(toUpper(input), "LOREM OPSUM", "Convert chars into uppercase")

  t.end()
})
