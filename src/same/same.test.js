import test from "tape"

import { same } from "./same"

test("same", t => {
  const object = {}

  t.equals(
    same(object)(),
    object,
    "Give value as input, get the same value in return"
  )

  t.end()
})
