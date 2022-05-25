import test from "tape"

import { sliceKeys } from "./slice-keys.js"

// eslint-disable-next-line unicorn/no-null
const object = { foo: 1, bar: "2", baz: null, qux: undefined, fred: 1, tud: [] }

test("sliceKeys", t => {
  t.deepEquals(
    sliceKeys(["foo", "bar", "qux", "xxx", "tud"])(object),
    { foo: 1, bar: "2", qux: undefined, tud: [] },
    "Returns a new object filtered with the passed keys, if present"
  )

  t.deepEquals(
    sliceKeys([])(object),
    {},
    "Returns an empty object if no keys are provided"
  )

  t.deepEquals(
    sliceKeys([], object),
    {},
    "Returns an empty object if no keys are provided - uncurried"
  )

  t.deepEquals(
    sliceKeys(["baz", "fred"])({}),
    {},
    "Returns an empty object if applied on an empty object"
  )

  t.end()
})
