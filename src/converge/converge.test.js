import test from "tape"

import { converge } from "./converge.js"
import { reduce } from "../reduce/reduce.js"
import { read } from "../read/read.js"

const sum = (...params) => reduce((acc, item) => acc + item, 0, params)

test("converge", t => {
  const input = [{ a: 1, b: 2 }]

  t.equals(
    converge(sum, [read([0, "a"], 0), read([0, "b"], 0)])(input),
    3,
    "Extract object properties + sum (curried)"
  )

  t.equals(
    converge([sum], read([0, "b"]), input),
    2,
    "Extract object property + sum (uncurried)"
  )

  t.equals(
    converge(sum, [read([0, "a"]), read([0, "b"]), read(["a", "x"], 1)])(input),
    4,
    "Extract object properties + sum (uncurried)"
  )

  t.equals(
    converge(sum, [
      (parameter1, parameter2) => parameter1 + read([0, "b"])(parameter2),
    ])(1, input),
    3,
    "Any arity on source parameter (curried)"
  )

  t.equals(
    converge(
      sum,
      [(parameter1, parameter2) => parameter1 + read([0, "b"])(parameter2)],
      1,
      input
    ),
    3,
    "Any arity on source parameter (uncurried)"
  )

  t.end()
})
