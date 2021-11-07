import test from "tape"

import { merge, mergeAll, mergeBy } from "./merge.js"

test("merge, mergeAll", t => {
  const object1 = { a: undefined }
  const object2 = { a: "lorem", b: "ipsum", c: 41 }
  const object3 = { c: 42, b: undefined }

  t.deepEqual(
    mergeBy((a, b) => ({ ...a, ...b }), [object1, object2, object3]),
    { a: "lorem", b: undefined, c: 42 },
    "mergeBy 3 objects - uncurried"
  )

  t.deepEqual(
    mergeBy((a, b) => ({ ...a, ...b }))([object1, object2, object3]),
    { a: "lorem", b: undefined, c: 42 },
    "mergeBy 3 objects - curried"
  )

  t.deepEqual(
    mergeAll([object1, object2, object3]),
    { a: "lorem", b: undefined, c: 42 },
    "mergeAll 3 objects - uncurried"
  )

  t.deepEqual(
    merge(object1)(object2),
    { a: "lorem", b: "ipsum", c: 41 },
    "merge 2 objects - curried"
  )

  t.deepEqual(
    merge(object1, object2),
    { a: "lorem", b: "ipsum", c: 41 },
    "merge 2 objects - curried"
  )

  t.end()
})
