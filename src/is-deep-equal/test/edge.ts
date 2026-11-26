import test from "tape"

import { isDeepEqual } from "../is-deep-equal.js"

// An object nested `depth` levels deep: { a: { a: … { a: 1 } } }
const nest = (depth: number): Record<string, unknown> => {
  let value: Record<string, unknown> = { a: 1 }

  for (let level = 1; level < depth; level++) {
    value = { a: value }
  }

  return value
}

test("isDeepEqual - edge", t => {
  {
    // A buffer has no keys and no length. Two different signatures or
    // digests must not compare equal
    const bytes = (...values: number[]) => new Uint8Array(values).buffer

    t.equal(
      isDeepEqual(bytes(1, 2), bytes(1, 3)),
      false,
      "given [two ArrayBuffers with different bytes] should [return false]"
    )
    t.equal(
      isDeepEqual(bytes(1, 2), bytes(1, 2)),
      true,
      "given [two ArrayBuffers with the same bytes] should [return true]"
    )
    t.equal(
      isDeepEqual(bytes(1), bytes(1, 0)),
      false,
      "given [two ArrayBuffers of different lengths] should [return false]"
    )
    t.equal(
      isDeepEqual(new DataView(bytes(1)), new DataView(bytes(2))),
      false,
      "given [two DataViews with different bytes] should [return false]"
    )
    t.equal(
      isDeepEqual(new DataView(bytes(0, 7), 1), new DataView(bytes(7))),
      true,
      "given [two DataViews over the same bytes at different offsets] should [return true]"
    )
  }

  {
    const shared = (value: number) => {
      const buffer = new SharedArrayBuffer(1)
      new Uint8Array(buffer)[0] = value
      return buffer
    }

    t.equal(
      isDeepEqual(shared(1), shared(2)),
      false,
      "given [two SharedArrayBuffers with different bytes] should [return false]"
    )
  }

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

  // JSON cannot hold a symbol, so a $$typeof key from JSON is plain data
  t.equal(
    isDeepEqual(
      { $$typeof: 1, _owner: "alice" },
      { $$typeof: 1, _owner: "mallory" }
    ),
    false,
    "given [a $$typeof key that is not a symbol, eg. from JSON] should [compare _owner]"
  )

  t.equal(
    isDeepEqual({ _owner: { a: 1 } }, { _owner: { a: 2 } }),
    false,
    "given [a plain object with a different _owner] should [compare _owner]"
  )

  // isDeepEqual recurses, so the stack sets its limit, about 2,300 levels
  // before V8 optimizes it. bench/depth.ts measures it on the machine at hand
  t.equal(
    isDeepEqual(nest(2000), nest(2000)),
    true,
    "given [two objects nested 2,000 levels deep] should [compare them]"
  )
  t.throws(
    () => isDeepEqual(nest(100_000), nest(100_000)),
    RangeError,
    "given [two objects nested 100,000 levels deep] should [throw the engine's RangeError]"
  )

  t.end()
})
