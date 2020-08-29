import test from "tape"
import { hasKey } from ".."

test("hasKey", t => {
  t.equals(hasKey("test")({}), false, "Primitive exists in array")
  t.equals(hasKey("test", { test: "1" }), true, "Primitive exists in array")

  t.end()
})
