import test from "tape"

import { contains } from "./contains"

test("contains", t => {
  t.equals(
    contains("lorem")("lorem ipsum"),
    true,
    "Search string exists in source string - curried"
  )

  t.equals(
    contains("lorem", "lorem ipsum"),
    true,
    "Search string exists in source string - uncurried"
  )

  t.equals(
    contains("loremx", "lorem ipsum"),
    false,
    "Search string does not exist in source string"
  )

  t.equals(
    contains("lorem ipsum very long dolor", "lorem ipsum"),
    false,
    "Search string longer than source string"
  )

  t.end()
})
