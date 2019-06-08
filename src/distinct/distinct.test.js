import test from "tape"
import { distinct } from ".."

test("array::distinct", t => {
  t.deepEqual(
    distinct([1, 1, 3]),
    [1, 3],
    "Primitives: ([1, 1 ,3]) // => [1, 3]"
  )

  t.deepEqual(
    distinct([1, "1", 3]),
    [1, "1", 3],
    'Primitives: ([ 1, "1" ,3 ]) // => [ 1, "1" ,3 ]'
  )

  t.deepEqual(
    distinct([1, { a: 2 }, { a: 2 }]),
    [1, { a: 2 }],
    "Recursive: ([1, {a: 2}, {a: 2}]) // => [1, {a: 2}]"
  )

  t.end()
})
