import test from "tape"
import { same } from ".."

test("same", t => {
  const obj = {}

  t.equals(
    same(obj)(),
    obj,
    "Give value as input, get the same value in return"
  )

  t.end()
})
