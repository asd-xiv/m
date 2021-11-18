import test from "tape"

import { inc } from "./inc.js"

test("inc", t => {
  t.equal(inc(2), 3, "Increment number")

  t.end()
})
