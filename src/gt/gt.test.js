import test from "tape"

import { gt } from "./gt.js"

test("gt", t => {
  t.equals(gt(10)(4), false, "4 is not grater than 10")
  t.equals(gt(10)(10), false, "10 is not grater than 10")
  t.equals(gt(10)(14), true, "14 is grater than 10")
  t.equals(gt(10, 10), false, "10 is mpt grater than 10")

  t.end()
})
