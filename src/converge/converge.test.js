import test from "tape"

import { converge } from "./converge"
import { reduce } from "../reduce/reduce"
import { read } from "../read/read"

test("converge", t => {
  const source = [{ a: 1, b: 2 }]
  const sum = (...params) => reduce((acc, item) => acc + item, 0, params)

  t.equals(
    converge(sum, [read([0, "a"], 0), read([0, "b"], 0)])(source),
    3,
    "Extract object properties + sum (curried)"
  )

  t.equals(
    converge([sum], read([0, "b"]), source),
    2,
    "Extract object property + sum (uncurried)"
  )

  t.equals(
    converge(sum, [read([0, "a"]), read([0, "b"]), read(["a", "x"], 1)])(
      source
    ),
    4,
    "Extract object properties + sum (uncurried)"
  )

  t.equals(
    converge(sum, [(param1, param2) => param1 + read([0, "b"])(param2)])(
      1,
      source
    ),
    3,
    "Any arity on source parameter (curried)"
  )

  t.equals(
    converge(
      sum,
      [(param1, param2) => param1 + read([0, "b"])(param2)],
      1,
      source
    ),
    3,
    "Any arity on source parameter (uncurried)"
  )

  t.end()
})
