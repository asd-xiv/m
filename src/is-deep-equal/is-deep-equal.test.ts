import test from "tape"

import { isDeepEqual } from "./is-deep-equal.js"

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

  t.end()
})

test("isDeepEqual - edge", t => {
  t.equal(
    isDeepEqual([], []),
    true,
    "given [empty arrays] should [return true]"
  )

  t.equal(
    isDeepEqual({}, {}),
    true,
    "given [empty objects] should [return true]"
  )

  t.equal(
    isDeepEqual([1], [1, 2]),
    false,
    "given [arrays of different lengths] should [return false]"
  )
  t.equal(
    isDeepEqual([1, 2], [1]),
    false,
    "given [arrays of different lengths] should [return false]"
  )

  t.equal(
    isDeepEqual([1, , 3], [1, undefined, 3]),
    true,
    "given [a sparse array and a dense array] should [compare by index]"
  )

  t.equal(
    isDeepEqual({ a: 1, b: undefined }, { a: 1, c: 3 }),
    false,
    "given [a missing key and a key with undefined] should [return false]"
  )
  t.equal(
    isDeepEqual({ a: 1 }, { a: 1, b: undefined }),
    false,
    "given [a missing key and a key with undefined] should [return false]"
  )
  t.equal(
    isDeepEqual({ a: 1, b: undefined }, { a: 1 }),
    false,
    "given [a missing key and a key with undefined] should [return false]"
  )

  t.equal(
    isDeepEqual({ a: undefined }, { b: undefined }),
    false,
    "given [objects with the same key count and different keys] should [return false]"
  )

  t.equal(
    isDeepEqual([1], { 0: 1, length: 1 }),
    false,
    "given [an array and an array-like object] should [return false]"
  )
  t.equal(
    isDeepEqual({ 0: 1, length: 1 }, [1]),
    false,
    "given [an array and an array-like object] should [return false]"
  )

  t.equal(
    isDeepEqual({}, Object.create(null)),
    false,
    "given [a plain object and an object without a prototype] should [return false]"
  )
  t.equal(
    isDeepEqual(Object.create(null), {}),
    false,
    "given [a plain object and an object without a prototype] should [return false]"
  )

  t.equal(
    isDeepEqual(
      Object.assign(Object.create(null), { a: 1 }),
      Object.assign(Object.create(null), { a: 1 })
    ),
    true,
    "given [two objects without a prototype] should [return true]"
  )

  {
    class A {
      value = 1
    }
    class B {
      value = 1
    }

    t.equal(
      isDeepEqual(new A(), new B()),
      false,
      "given [instances of different classes with equal fields] should [return false]"
    )
  }

  {
    class A {
      value = 1
    }

    t.equal(
      isDeepEqual(new A(), new A()),
      true,
      "given [instances of the same class with equal fields] should [return true]"
    )
  }

  t.equal(
    isDeepEqual(new Map(), new Set()),
    false,
    "given [a Map and a Set] should [return false]"
  )

  t.equal(
    isDeepEqual(new Map(), new Map()),
    true,
    "given [an empty Map and an empty Set of the same shape] should [return true for each]"
  )
  t.equal(
    isDeepEqual(new Set(), new Set()),
    true,
    "given [an empty Map and an empty Set of the same shape] should [return true for each]"
  )

  t.equal(
    isDeepEqual(new Date(0), {}),
    false,
    "given [a Date and a plain object] should [return false]"
  )

  t.equal(
    isDeepEqual(/a/, {}),
    false,
    "given [a RegExp and a plain object] should [return false]"
  )

  t.equal(
    isDeepEqual(new Date(0), /a/),
    false,
    "given [a Date and a RegExp] should [return false]"
  )

  // NaN valueOf, and NaN !== NaN
  t.equal(
    isDeepEqual(new Date(NaN), new Date(NaN)),
    false,
    "given [two invalid Dates] should [return false]"
  )

  t.equal(
    isDeepEqual(new Object(1), new Object(1)),
    true,
    "given [object wrappers of equal primitives] should [return true]"
  )

  t.equal(
    isDeepEqual(new Object("a"), new Object("b")),
    false,
    "given [object wrappers of equal primitives] should [return true]"
  )

  t.equal(
    isDeepEqual(
      { $$typeof: 1, _owner: { a: 1 } },
      { $$typeof: 1, _owner: { a: 2 } }
    ),
    true,
    "given [an object with a $$typeof key and a different _owner] should [skip _owner]"
  )

  t.equal(
    isDeepEqual({ _owner: { a: 1 } }, { _owner: { a: 2 } }),
    false,
    "given [a plain object with a different _owner] should [compare _owner]"
  )

  t.end()
})

test("isDeepEqual - invalid", t => {
  t.equal(
    isDeepEqual(1, {}),
    false,
    "given [a number and an object] should [return false]"
  )
  t.equal(
    isDeepEqual({}, 1),
    false,
    "given [a number and an object] should [return false]"
  )

  t.equal(
    isDeepEqual(() => 1, {}),
    false,
    "given [a function and an object] should [return false]"
  )

  t.equal(
    isDeepEqual(Symbol("a"), Symbol("a")),
    false,
    "given [a Symbol and the same description] should [return false]"
  )

  t.equal(
    isDeepEqual("a", new Object("a")),
    false,
    "given [a string and a String object] should [return false]"
  )

  t.equal(
    isDeepEqual({ a: NaN, b: 1 }, { a: NaN, b: 2 }),
    false,
    "given [two NaN inside objects with a different sibling] should [return false]"
  )

  t.end()
})

test("isDeepEqual - curried", t => {
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
