import test from "tape"

import { flatten } from "../flatten.js"

// An object nested `depth` levels deep: { a: { a: … { a: 1 } } }
const nest = (depth: number): Record<string, unknown> => {
  let value: Record<string, unknown> = { a: 1 }

  for (let level = 1; level < depth; level++) {
    value = { a: value }
  }

  return value
}

test("flatten - edge", t => {
  // flatten recurses, so the stack sets its limit: 5,468 levels on Node 22
  // and 26. JSON.parse accepts any depth, so a request body can go deeper
  t.equal(
    Object.keys(flatten(nest(4000))).length,
    1,
    "given [an object nested 4,000 levels deep] should [flatten it to one key]"
  )

  t.throws(
    () => flatten(nest(100_000)),
    RangeError,
    "given [an object nested 100,000 levels deep] should [throw the engine's RangeError]"
  )

  t.end()
})
