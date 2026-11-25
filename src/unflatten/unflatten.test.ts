import test from "tape"

import { unflatten } from "./unflatten.js"

test("unflatten - uncurried", t => {
  t.deepEqual(
    unflatten({}),
    {},
    "given [empty object] should [return empty object]"
  )

  t.deepEqual(
    unflatten({ a: 1, b: 2 }),
    { a: 1, b: 2 },
    "given [flat object with no dots] should [return same object]"
  )

  t.deepEqual(
    unflatten({ "a.b": 1, "a.c": 2 }),
    { a: { b: 1, c: 2 } },
    "given [object with dot-notation keys] should [return nested object]"
  )

  t.deepEqual(
    unflatten({ "a.b.c.d": 42 }),
    { a: { b: { c: { d: 42 } } } },
    "given [deeply nested dot paths] should [build full nesting]"
  )

  t.deepEqual(
    unflatten({ "a.b": 1, "c": 2, "d.e.f": 3 }),
    { a: { b: 1 }, c: 2, d: { e: { f: 3 } } },
    "given [mixed flat and dot keys] should [nest only dot keys]"
  )

  t.deepEqual(
    unflatten("__", { a__b: 1, c__d__e: 2 }),
    { a: { b: 1 }, c: { d: { e: 2 } } },
    "given [custom separator and flat object] should [use separator]"
  )

  {
    const result = unflatten({
      "__proto__.polluted": 1,
      "constructor.prototype.polluted": 2,
    })

    t.equal(
      ({} as Record<string, unknown>)["polluted"],
      undefined,
      "given [a __proto__ or constructor key] should [not change Object.prototype]"
    )

    t.deepEqual(
      Object.getOwnPropertyNames(result),
      ["__proto__", "constructor"],
      "given [a __proto__ or constructor key] should [keep it as an own key]"
    )
  }

  t.deepEqual(
    unflatten({ "a.": 1, "b": 2 }),
    { a: { "": 1 }, b: 2 },
    "given [a key with a trailing separator] should [keep its value under an empty key]"
  )

  t.deepEqual(
    unflatten({ ".a": 1 }),
    { "": { a: 1 } },
    "given [a key with a leading separator] should [nest under an empty key]"
  )

  t.deepEqual(
    unflatten({ "a.b": 1, "a.c.d": 2 }),
    { a: { b: 1, c: { d: 2 } } },
    "given [keys that share a prefix] should [merge them in one object]"
  )

  t.end()
})

test("unflatten - curried", t => {
  t.deepEqual(
    unflatten("__")({ a__b: 1 }),
    { a: { b: 1 } },
    "given [custom separator] should [return function that unflattens]"
  )

  t.deepEqual(
    unflatten("/")({ "x/y/z": 42 }),
    { x: { y: { z: 42 } } },
    "given [slash separator] should [build nested from slashes]"
  )

  t.end()
})

test("unflatten - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => unflatten(42),
    /expected 'input' to be 'String' or 'Object'/,
    "given [a number] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => unflatten(null),
    /expected 'input' to be 'String' or 'Object'/,
    "given [null] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => unflatten(".", 42),
    /expected 'input' to be 'Object'/,
    "given [separator and non-object] should [throw TypeError]"
  )

  t.throws(
    () => unflatten({ "a": 1, "a.b": 2 }),
    /@asd14\/m\/unflatten: expected 'a' to be 'Prefix', got 'Leaf'/,
    "given [a leaf before its prefix] should [throw TypeError]"
  )

  t.throws(
    () => unflatten({ "a.b": 2, "a": 1 }),
    /@asd14\/m\/unflatten: expected 'a' to be 'Leaf', got 'Prefix'/,
    "given [a prefix before its leaf] should [throw TypeError]"
  )

  t.throws(
    () => unflatten({ "a.b": 1, "a.b.c": 2 }),
    /expected 'a.b' to be 'Prefix', got 'Leaf'/,
    "given [a nested leaf before its prefix] should [name the full path]"
  )

  t.throws(
    () => unflatten({ "a": { b: 1 }, "a.c": 2 }),
    /expected 'a' to be 'Prefix', got 'Leaf'/,
    "given [an object value and a key under it] should [throw, not write into the value]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => unflatten(new Date(0)),
    /expected 'input' to be 'String' or 'Object', got 'Date'/,
    "given [a Date] should [throw TypeError]"
  )

  t.end()
})
