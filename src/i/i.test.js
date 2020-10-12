import test from "tape"

import { i } from "./i"

test("i", t => {
  t.equals(i(true), true, "Identity boolean")
  t.equals(i(3), 3, "Identity string")
  t.equals(i("asd"), "asd", "Identity string")

  const array = [1, 2, 3]

  t.equals(i(array), array, "Identity array")

  const object = { a: 1, b: 2 }

  t.equals(i(object), object, "Identity object")

  t.end()
})
