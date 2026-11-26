import test from "tape"

import { isDeepEqual } from "../is-deep-equal.js"

// A stand-in for a React element: `$$typeof` marks it, `_owner` is circular
const createElement = (
  elementType: string,
  properties: Record<string, unknown> = {},
  children?: string
): Record<string, unknown> => ({
  $$typeof: Symbol.for("react.element"),
  type: elementType,
  key: null,
  properties: { ...properties, children },
  _owner: null,
})

test("isDeepEqual - valid", t => {
  t.equal(
    isDeepEqual(1, 1),
    true,
    "given [two equal primitives] should [return true]"
  )
  t.equal(
    isDeepEqual("a", "a"),
    true,
    "given [two equal primitives] should [return true]"
  )
  t.equal(
    isDeepEqual(true, true),
    true,
    "given [two equal primitives] should [return true]"
  )
  t.equal(
    isDeepEqual(null, null),
    true,
    "given [two equal primitives] should [return true]"
  )
  t.equal(
    isDeepEqual(undefined, undefined),
    true,
    "given [two equal primitives] should [return true]"
  )

  t.equal(
    isDeepEqual(1, 2),
    false,
    "given [two different primitives] should [return false]"
  )
  t.equal(
    isDeepEqual("a", "b"),
    false,
    "given [two different primitives] should [return false]"
  )
  t.equal(
    isDeepEqual(true, false),
    false,
    "given [two different primitives] should [return false]"
  )

  t.equal(
    isDeepEqual(1, "1"),
    false,
    "given [two values of different types] should [return false]"
  )
  t.equal(
    isDeepEqual(0, false),
    false,
    "given [two values of different types] should [return false]"
  )
  t.equal(
    isDeepEqual(null, undefined),
    false,
    "given [two values of different types] should [return false]"
  )
  t.equal(
    isDeepEqual({}, []),
    false,
    "given [two values of different types] should [return false]"
  )

  t.equal(isDeepEqual(NaN, NaN), true, "given [two NaN] should [return true]")

  t.equal(
    isDeepEqual(NaN, 1),
    false,
    "given [NaN and a number] should [return false]"
  )
  t.equal(
    isDeepEqual(1, NaN),
    false,
    "given [NaN and a number] should [return false]"
  )

  t.equal(
    isDeepEqual(null, {}),
    false,
    "given [null and an object] should [return false]"
  )
  t.equal(
    isDeepEqual({}, null),
    false,
    "given [null and an object] should [return false]"
  )

  t.equal(
    isDeepEqual([1, [2, [3]]], [1, [2, [3]]]),
    true,
    "given [equal nested arrays] should [return true]"
  )

  t.equal(
    isDeepEqual([1, [2, [3]]], [1, [2, [4]]]),
    false,
    "given [arrays with a different nested item] should [return false]"
  )

  t.equal(
    isDeepEqual([1, 2], [2, 1]),
    false,
    "given [arrays with the same items in another order] should [return false]"
  )

  t.equal(
    isDeepEqual({ a: { b: [1, { c: 2 }] } }, { a: { b: [1, { c: 2 }] } }),
    true,
    "given [equal nested plain objects] should [return true]"
  )

  t.equal(
    isDeepEqual({ a: { b: 1 } }, { a: { b: 2 } }),
    false,
    "given [plain objects with a different nested value] should [return false]"
  )

  t.equal(
    isDeepEqual({ a: 1, b: 2 }, { b: 2, a: 1 }),
    true,
    "given [plain objects with the same keys in another order] should [return true]"
  )

  t.equal(
    isDeepEqual(
      new Map([
        ["a", 1],
        ["b", 2],
      ]),
      new Map([
        ["b", 2],
        ["a", 1],
      ])
    ),
    true,
    "given [equal Maps] should [return true]"
  )

  t.equal(
    isDeepEqual(new Map([["a", 1]]), new Map([["b", 1]])),
    false,
    "given [Maps with a different key] should [return false]"
  )

  t.equal(
    isDeepEqual(new Map([["a", 1]]), new Map([["a", 2]])),
    false,
    "given [Maps with a different value] should [return false]"
  )

  t.equal(
    isDeepEqual(new Map([["a", { b: [1] }]]), new Map([["a", { b: [1] }]])),
    true,
    "given [Maps with equal nested values] should [return true]"
  )

  t.equal(
    isDeepEqual(new Map([["a", { b: [1] }]]), new Map([["a", { b: [2] }]])),
    false,
    "given [Maps with a different nested value] should [return false]"
  )

  t.equal(
    isDeepEqual(
      new Map([["a", 1]]),
      new Map([
        ["a", 1],
        ["b", 2],
      ])
    ),
    false,
    "given [Maps of different sizes] should [return false]"
  )

  t.equal(
    isDeepEqual(new Set([1, 2, 3]), new Set([3, 2, 1])),
    true,
    "given [equal Sets] should [return true]"
  )

  t.equal(
    isDeepEqual(new Set([1, 2]), new Set([1, 3])),
    false,
    "given [Sets with a different item] should [return false]"
  )

  t.equal(
    isDeepEqual(new Set([1]), new Set([1, 2])),
    false,
    "given [Sets of different sizes] should [return false]"
  )

  t.equal(
    isDeepEqual(new Uint8Array([1, 2]), new Uint8Array([1, 2])),
    true,
    "given [equal typed arrays] should [return true]"
  )
  t.equal(
    isDeepEqual(new Float64Array([1.5]), new Float64Array([1.5])),
    true,
    "given [equal typed arrays] should [return true]"
  )

  t.equal(
    isDeepEqual(new Uint8Array([1, 2]), new Uint8Array([1, 3])),
    false,
    "given [typed arrays with a different item] should [return false]"
  )

  t.equal(
    isDeepEqual(new Uint8Array([1]), new Uint8Array([1, 2])),
    false,
    "given [typed arrays of different lengths] should [return false]"
  )

  t.equal(
    isDeepEqual(new Uint8Array([1]), new Int8Array([1])),
    false,
    "given [typed arrays of different types] should [return false]"
  )

  t.equal(
    isDeepEqual(/a+/gi, /a+/gi),
    true,
    "given [equal RegExp] should [return true]"
  )

  t.equal(
    isDeepEqual(/a/g, /b/g),
    false,
    "given [RegExp with a different source] should [return false]"
  )

  t.equal(
    isDeepEqual(/a/g, /a/i),
    false,
    "given [RegExp with different flags] should [return false]"
  )

  t.equal(
    isDeepEqual(new Date(0), new Date(0)),
    true,
    "given [Dates of the same time] should [return true]"
  )

  t.equal(
    isDeepEqual(new Date(0), new Date(1)),
    false,
    "given [Dates of different times] should [return false]"
  )

  t.equal(
    isDeepEqual({ valueOf: () => 1, a: 1 }, { valueOf: () => 1, a: 2 }),
    true,
    "given [objects with an equal own valueOf result] should [return true]"
  )

  t.equal(
    isDeepEqual({ valueOf: () => 1 }, { valueOf: () => 2 }),
    false,
    "given [objects with a different own valueOf result] should [return false]"
  )

  t.equal(
    isDeepEqual({ toString: () => "x", a: 1 }, { toString: () => "x", a: 2 }),
    true,
    "given [objects with an equal own toString result] should [return true]"
  )

  t.equal(
    isDeepEqual({ toString: () => "x" }, { toString: () => "y" }),
    false,
    "given [objects with a different own toString result] should [return false]"
  )

  {
    const fn = () => 1

    t.equal(
      isDeepEqual(fn, fn),
      true,
      "given [the same function reference] should [return true]"
    )
  }

  t.equal(
    isDeepEqual(
      () => 1,
      () => 1
    ),
    false,
    "given [two equal but distinct functions] should [return false]"
  )

  t.equal(
    isDeepEqual(
      createElement("p", { className: "a" }, "text"),
      createElement("p", { className: "a" }, "text")
    ),
    true,
    "given [equal React elements] should [return true]"
  )

  t.equal(
    isDeepEqual(
      createElement("p", { className: "a" }),
      createElement("p", { className: "b" })
    ),
    false,
    "given [React elements with different properties] should [return false]"
  )

  {
    const left = { ...createElement("p"), _owner: { name: "A" } }
    const right = { ...createElement("p"), _owner: { name: "B" } }

    t.equal(
      isDeepEqual(left, right),
      true,
      "given [deep-equal React elements with different _owner] should [return true]"
    )
  }

  {
    const left = { ...createElement("p", { id: "a" }), _owner: { name: "A" } }
    const right = { ...createElement("p", { id: "b" }), _owner: { name: "B" } }

    t.equal(
      isDeepEqual(left, right),
      false,
      "given [React elements with different _owner and different properties] should [return false]"
    )
  }

  t.equal(
    isDeepEqual(
      { ...createElement("p"), _owner: { a: 1 } },
      { ...createElement("p"), _owner: { a: 2 } }
    ),
    true,
    "given [two React elements with a different _owner] should [skip _owner]"
  )

  // Curried
  t.equal(
    isDeepEqual({ a: [1, 2] })({ a: [1, 2] }),
    true,
    "given [equal nested objects, curried] should [return true]"
  )

  t.equal(
    isDeepEqual(new Date(0))(new Date(1)),
    false,
    "given [Dates of different times, curried] should [return false]"
  )

  t.end()
})
