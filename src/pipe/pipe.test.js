import test from "tape"

import { pipe } from "./pipe"

const inc = source => source + 1
const sum = (a, b) => a + b

test("pipe", t => {
  t.deepEqual(pipe(inc, inc)(2), 4, "first input arity 1")

  t.deepEqual(pipe(sum, inc)(2, 2), 5, "first input arity 2")

  t.end()
})
