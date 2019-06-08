import test from "tape"
import { forEach } from ".."

test("forEach", t => {
  const tmp = []

  forEach(elm => tmp.push(elm))([1, 2, 3])

  t.deepEqual(tmp, [1, 2, 3], "Run function over each element of array")

  t.end()
})
