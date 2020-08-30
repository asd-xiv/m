import test from "tape"
import { repeat } from ".."

test("repeat", t => {
  const inc = x => x + 1

  t.deepEqual(repeat(inc)(5), [1, 2, 3, 4, 5], "Repeat function curried")
  t.deepEqual(repeat(inc, 2), [1, 2], "Repeat function uncurried ")
  t.deepEqual(repeat([inc, inc], 2), [2, 3], "Repeat with function chain")

  t.deepEqual(repeat(inc)(), [], "Repeat without count")
  t.deepEqual(repeat(3, 2), [3, 3], "Repeat value curried ")

  t.end()
})
