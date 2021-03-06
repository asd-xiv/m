import test from "tape"

import { dropLast } from "./drop-last"

test("dropLast", t => {
  t.deepEqual(
    dropLast([1, 1, 3]),
    [1, 1],
    "Drop default 1 when source is first arg"
  )

  t.deepEqual(dropLast(2)([1, 1, 3]), [1], "Drop 2 when source is second arg")

  t.deepEqual(
    dropLast(3)([1, 1, 3]),
    [],
    "Drop max number of elements when source is second arg"
  )

  t.deepEqual(dropLast(5)([1, 1, 3]), [], "Drop more than available elements")

  const source = [1, 1, 3]

  t.notEqual(dropLast(1)(source), source, "Imutable")

  t.end()
})
