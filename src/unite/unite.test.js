import test from "tape"

import { unite } from "./unite.js"

test("unite", t => {
  t.deepEqual(
    unite(",", [1, 2, 3]),
    "1,2,3",
    "given [a comma and and array] should [return a string with items separated by comma]"
  )

  t.end()
})
