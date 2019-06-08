import test from "tape"
import { gt } from ".."

test("gt", t => {
  t.equals(gt(4)(10), false, "4 is not grater than 10")
  t.equals(gt(10)(10), false, "10 is not grater than 10")
  t.equals(gt(14)(10), true, "14 is grater than 10")

  t.end()
})
