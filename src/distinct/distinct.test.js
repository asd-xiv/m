import deepEquals from "fast-deep-equal"
import test from "tape"

import { distinct, distinctBy } from "./distinct.js"

test("distinct", t => {
  t.deepEqual(
    distinct([]),
    [],
    "given [empty array] should [return empty array]"
  )

  t.deepEqual(
    distinct([1, 1, 3]),
    [1, 3],
    "given [array with duplicate items of same type] should [return array with unique items]"
  )

  t.deepEqual(
    distinct([1, "1", 3]),
    [1, "1", 3],
    "given [array with unique items] should [return array with same items]"
  )

  t.end()
})

test("distinctBy", t => {
  t.deepEqual(
    distinctBy(deepEquals, [1, { a: 2 }, { a: 2 }]),
    [1, { a: 2 }],
    "given [empty array] should [return empty array]"
  )

  t.end()
})
