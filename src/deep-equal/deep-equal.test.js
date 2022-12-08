/* eslint-disable unicorn/no-null */

import test from "tape"

import { isDeepEqual } from "./deep-equal.js"

// eslint-disable-next-line @typescript-eslint/no-empty-function
const fn = () => {}

test("isDeepEqual", t => {
  t.equal(isDeepEqual(null, null), true, "Primitives: 1 === 1")

  t.equal(isDeepEqual(undefined, null), false, "Primitives: 1 === 1")

  t.equal(isDeepEqual([undefined], []), false, "Primitives: 1 === 1")

  t.equal(isDeepEqual([null], [null]), true, "Primitives: 1 === 1")

  t.equal(isDeepEqual(1, 1), true, "Primitives: 1 === 1")

  t.equal(isDeepEqual(1, "3"), false, 'Primitives: 1 !== "3"')

  t.equal(isDeepEqual(fn, fn), true, "Functions: fn === fn")

  t.equal(
    isDeepEqual(new RegExp("test", "gu"), new RegExp("test")),
    false,
    "RegExp: /test/gu !== /test/"
  )

  t.equal(
    isDeepEqual(new RegExp("test", "gu"), new RegExp("test", "ug")),
    true,
    "RegExp: /test/gu === /test/ug"
  )

  t.equal(isDeepEqual([1, 2, 3], [2, 1]), false, "Array: [1, 2, 3] !== [2, 1]")

  t.equal(isDeepEqual([1, 2], [2, 1]), false, "Array: [1, 2] !== [2, 1]")

  t.equal(isDeepEqual([1, "2"], [2, 1]), false, 'Array: [1, "2"] !== [2, 1]')

  /**
   * Objects
   */
  t.equal(
    isDeepEqual({ a: 2, b: 3 }, { b: 3, a: 2 }),
    true,
    "Compare equal objects with keys arranged differently"
  )

  t.equal(
    isDeepEqual({ a: 2, b: 3 })({ b: 3, a: 2 }),
    true,
    "Compare equal objects with keys arranged differently (curry)"
  )

  t.equal(
    isDeepEqual({ a: 2, b: 3 }, { b: 3, a: 1 }),
    false,
    "Compare non equal objects with keys arranged differently"
  )

  t.equal(
    isDeepEqual({ a: 2, b: 3 }, { a: 2, b: 3, c: 1 }),
    false,
    "Compare objects with different number of keys"
  )

  t.equal(
    isDeepEqual(
      {
        lvl1: {},
        lvl2: { a: [1], b: 3 },
      },
      {
        lvl1: {},
        lvl2: { b: 3, a: [1] },
      }
    ),
    true,
    "Compare equal objects, 3 lvl deep, with keys arranged differently"
  )

  t.equal(
    isDeepEqual(
      {
        "lvl1": [1, 2, 3],
        "lvl1-1": { a: [1, 2], b: 3 },
      },
      {
        "lvl1-1": { a: [2, 1], b: 3 },
        "lvl1": [1, 2, 3],
      }
    ),
    false,
    "Compare non-equal objects, 3 lvl deep, with keys arranged differently"
  )

  t.equal(
    isDeepEqual({ 1: 2, 2: 3 }, [2, 1]),
    false,
    "Compare different types, object and array"
  )

  t.equal(
    isDeepEqual(new RegExp("test"), [2, 1]),
    false,
    "Compare different types, regexp and array"
  )

  t.end()
})
