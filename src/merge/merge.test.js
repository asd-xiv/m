import test from "tape"

import { merge, mergeAll, mergeBy } from "./merge"

test("merge, mergeAll", t => {
  const obj1 = { a: undefined }
  const obj2 = { a: "lorem", b: "ipsum", c: 41 }
  const obj3 = { c: 42, b: undefined }

  t.deepEqual(
    mergeBy((a, b) => ({ ...a, ...b }), [obj1, obj2, obj3]),
    { a: "lorem", b: undefined, c: 42 },
    "mergeBy 3 objects - uncurried"
  )

  t.deepEqual(
    mergeBy((a, b) => ({ ...a, ...b }))([obj1, obj2, obj3]),
    { a: "lorem", b: undefined, c: 42 },
    "mergeBy 3 objects - curried"
  )

  t.deepEqual(
    mergeAll([obj1, obj2, obj3]),
    { a: "lorem", b: undefined, c: 42 },
    "mergeAll 3 objects - uncurried"
  )

  t.deepEqual(
    merge(obj1)(obj2),
    { a: "lorem", b: "ipsum", c: 41 },
    "merge 2 objects - curried"
  )

  t.deepEqual(
    merge(obj1, obj2),
    { a: "lorem", b: "ipsum", c: 41 },
    "merge 2 objects - curried"
  )

  t.end()
})
