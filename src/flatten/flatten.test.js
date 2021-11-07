import test from "tape"

import { flatten } from "./flatten.js"

test("flatten", t => {
  t.equals(flatten(3), 3, "Flatten primitive returns same value")
  t.deepEqual(flatten([]), [], "[] should equal []")
  t.deepEqual(flatten([[[]]]), [], "[[[]]] should equal []")
  t.deepEqual(flatten([[[1]]]), [1], "[[[1]]] should equal [1]")
  t.deepEqual(
    flatten([1, [2], [3, [4]]]),
    [1, 2, 3, 4],
    "[1, [2], [3, [4]], []] should equal [1, 2, 3, 4]"
  )

  t.deepEqual(
    flatten({
      test: {
        inside: "one",
        another: "two",
        lvl: {
          three: "3",
        },
      },
      lorem: "ipsum",
      an_array: [1, 2],
    }),
    {
      test__inside: "one",
      test__another: "two",
      test__lvl__three: "3",
      lorem: "ipsum",
      an_array: [1, 2],
    },
    "Nested objects should return one lvl deep object"
  )

  t.end()
})
