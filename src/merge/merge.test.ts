import test from "tape"

import { merge } from "./merge.js"

test("merge - uncurried", t => {
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

  t.end()
})

test("merge - curried", t => {
  t.deepEqual(
    merge({ a: undefined })({ a: "lorem", b: "ipsum", c: 41 }),
    { a: "lorem", b: "ipsum", c: 41 },
    "given [curried with 1 arg] should [return function that merges second object]"
  )

  t.end()
})

test("merge - invalid input", t => {
  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => merge(),
    /expected 'first' to be 'Object' or 'Array', got 'Undefined'/,
    "given [no argument] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => merge(42),
    /expected 'first' to be 'Object' or 'Array', got 'Number'/,
    "given [a number as first] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => merge({ a: 1 })("lorem"),
    /expected 'second' to be 'Object', got 'String'/,
    "given [a string as curried second] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => merge({ a: 1 }, { b: 2 }, null),
    /expected 'objects\[2\]' to be 'Object', got 'Null'/,
    "given [null among variadic objects] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => merge([1, "a", null]),
    /expected 'objects\[0\]' to be 'Object', got 'Number'/,
    "given [an array with non-object items] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => merge([{ a: 1 }, new Date()]),
    /expected 'objects\[1\]' to be 'Object', got 'Date'/,
    "given [an array with a Date] should [throw TypeError, a Date is not plain]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => merge(new Map(), { a: 1 }),
    /expected 'first' to be 'Object' or 'Array', got 'Map'/,
    "given [a Map as first] should [throw TypeError, a Map is not plain]"
  )

  t.end()
})
