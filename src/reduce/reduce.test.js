import test from "tape"
import { reduce } from ".."

test("reduce", t => {
  t.equals(reduce((acc, next) => acc + next, 0)([1, 2, 3]), 6, "Sum an array")

  t.equals(
    reduce((acc, next) => acc + next, 0)(12),
    12,
    "Run reduce for non-array input, treat as array of one"
  )

  t.equals(
    reduce((acc = 0, next) => acc + next)([1, 2, 3]),
    6,
    "Sum an array with the initial acc left undefined in the reduce function but set as default value in the param"
  )

  t.equals(
    reduce((acc = 0, next) => acc + next, 0)([]),
    0,
    "Reducing empty array return default acc"
  )

  t.deepEquals(
    reduce((acc, next) => ({ ...acc, [next]: next }), {})([1, 2, 3]),
    { 1: 1, 2: 2, 3: 3 },
    "From array to object with default acc"
  )

  t.end()
})
