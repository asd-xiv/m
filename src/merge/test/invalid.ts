import test from "tape"

import { merge } from "../merge.js"

test("merge - invalid", t => {
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
