import test from "tape"
import { converge, reduce, read } from ".."

test("converge", t => {
  const obj = { a: 1, b: 2 }
  const sum = (...params) => reduce((acc, item) => acc + item, 0, params)

  t.equals(
    converge(sum, [read("a"), read("b")])(obj),
    3,
    "Extract object properties + sum (curried)"
  )

  t.equals(
    converge(sum, read("b"), obj),
    2,
    "Extract object property + sum (uncurried)"
  )

  t.equals(
    converge([sum], [read("a"), read("b")], obj),
    3,
    "Extract object properties + sum (uncurried)"
  )

  t.end()
})
