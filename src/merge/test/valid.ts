import test from "tape"

import { merge } from "../merge.js"

test("merge - valid", t => {
  const object1 = { a: undefined }
  const object2 = { a: "lorem", b: "ipsum", c: 41 }
  const object3 = { c: 42, b: undefined }

  t.deepEqual(
    merge(object1, object2, object3),
    { a: "lorem", b: undefined, c: 42 },
    "given [3 variadic objects] should [shallow merge left-to-right, right-most wins]"
  )

  t.deepEqual(
    merge([object1, object2, object3]),
    { a: "lorem", b: undefined, c: 42 },
    "given [array of 3 objects] should [shallow merge left-to-right]"
  )

  t.deepEqual(
    merge(object1, object2),
    { a: "lorem", b: "ipsum", c: 41 },
    "given [2 variadic objects] should [shallow merge]"
  )

  {
    const readonlyObjects: readonly { a?: number; b?: number }[] = [
      { a: 1 },
      { b: 2 },
    ]

    t.deepEqual(
      merge(readonlyObjects),
      { a: 1, b: 2 },
      "given [a readonly array of objects] should [shallow merge]"
    )
  }

  t.deepEqual(
    merge({ a: 1 }, { a: undefined }),
    { a: undefined },
    "given [an undefined value on the right] should [keep the undefined, right wins]"
  )

  {
    const defaults = { a: 1 }
    const merged = merge(defaults, { b: 2 })

    t.notEqual(
      merged,
      defaults,
      "given [two objects] should [return a new object]"
    )
    t.deepEqual(
      defaults,
      { a: 1 },
      "given [two objects] should [not mutate the first]"
    )
  }

  {
    const polluted: Record<string, unknown> = JSON.parse(
      '{ "__proto__": { "polluted": true } }'
    ) as Record<string, unknown>
    const merged = merge({ a: 1 }, polluted)

    t.deepEqual(
      Object.keys(merged),
      ["a", "__proto__"],
      "given [an object with an own __proto__ key] should [keep it as an own key]"
    )
    t.equal(
      Object.getPrototypeOf(merged),
      Object.prototype,
      "given [an object with an own __proto__ key] should [leave the prototype alone]"
    )
  }

  {
    // One result, written key by key. A spread of the result for each object
    // took 10 s for 8,000 objects
    const objects = Array.from({ length: 20_000 }, (_, index) => ({
      [`key${index % 10_000}`]: index,
    }))
    const result = merge(objects)

    t.equal(
      Object.keys(result).length,
      10_000,
      "given [20,000 objects over 10,000 keys] should [merge them in one pass]"
    )
    t.equal(
      result["key0"],
      10_000,
      "given [20,000 objects over 10,000 keys] should [keep the last value of each key]"
    )
  }

  // Curried
  t.deepEqual(
    merge({ a: undefined })({ a: "lorem", b: "ipsum", c: 41 }),
    { a: "lorem", b: "ipsum", c: 41 },
    "given [curried with 1 arg] should [return function that merges second object]"
  )

  t.end()
})
