import test from "tape"

import { zipToObject } from "./zip-to-object"

test("zipToObject", t => {
  t.deepEquals(
    zipToObject(["a", "b"])([1, 2]),
    { a: 1, b: 2 },
    "arrays with same size should form object"
  )

  t.deepEquals(
    zipToObject(["a"])([1, 2]),
    { a: 1 },
    "arrays with less keys than values should form object"
  )

  t.deepEquals(
    zipToObject(["a", "b"])([2]),
    { a: 2 },
    "arrays with less values than keys should form object"
  )

  t.end()
})
