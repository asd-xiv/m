import test from "tape"
import { lt } from ".."

test("lt", t => {
  t.equals(lt(10)(14), false, "14 is not less than 10")
  t.equals(lt(10)(10), false, "10 is not less than 10")
  t.equals(lt(10)(4), true, "4 is less than 10")

  t.end()
})
