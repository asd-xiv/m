import test from "tape"
import { head } from ".."

test("head", t => {
  t.equal(head("xyz"), "x", "From string should return first char")
  t.equal(head([1, 2, 3]), 1, "From number array should return first element")
  t.equal(head([]), undefined, "From empty array should return undefined")
  t.equal(head(2), undefined, "From number should return undefined")
  t.equal(head({}), undefined, "From object should return undefined")
  t.equal(
    head(() => {}),
    undefined,
    "From function should return undefined"
  )

  t.end()
})
