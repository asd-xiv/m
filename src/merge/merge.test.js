import test from "tape"
import { merge } from ".."

test("merge", t => {
  const obj1 = { a: undefined }
  const obj2 = { a: "lorem", b: "ipsum", c: 41 }
  const obj3 = { c: 42, b: undefined }
  const result = merge(obj1, obj2, obj3)

  const resultAgain = merge(result, obj1, obj2, obj3)

  t.deepEqual(
    result,
    { a: "lorem", b: "ipsum", c: 42 },
    "3 objects should be merged into one"
  )

  t.deepEqual(result, resultAgain, "Idempotence")

  t.notEqual(result, obj1, "Imutability - first object")
  t.notEqual(result, obj2, "Imutability - second object")
  t.notEqual(result, obj3, "Imutability - third object")

  t.end()
})
