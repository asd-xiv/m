import test from "tape"
import { repeat } from ".."

test("repeat", t => {
  t.deepEqual(
    repeat(index => index + 2)(5),
    [2, 3, 4, 5, 6],
    "Repeat function 5 times "
  )
  t.deepEqual(repeat(index => index + 2)(), [], "Repeat function 0 times")
  t.deepEqual(repeat(3)(2), [3, 3], "Repeat value 2 times ")

  t.end()
})
