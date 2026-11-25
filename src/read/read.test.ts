import test from "tape"

import { read, get } from "./read.js"

test("read - uncurried", t => {
  t.equal(
    read(["a", "b"], "dolor", { a: { b: "lorem" } }),
    "lorem",
    "given [existing deep path with default] should [return value]"
  )

  t.equal(
    read(["foo"], null, { foo: null }),
    null,
    "given [null value at path with default] should [return null, not default]"
  )

  t.ok(
    Number.isNaN(read(["foo"], 0, { foo: Number.NaN })),
    "given [NaN value at path with default] should [return NaN, not default]"
  )

  // @ts-expect-error -- default type doesn't match resolved path type
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  const missingWithDefault = read(["a", "c"], "dolor", {})

  t.equal(
    missingWithDefault,
    "dolor",
    "given [non-existing deep path with default] should [return default]"
  )

  t.equal(
    // @ts-expect-error -- default type doesn't match resolved path type (undefined)
    read(["foo"], "default", { foo: null }),
    null,
    "given [null value at path with mismatched default] should [return null]"
  )

  t.ok(
    // @ts-expect-error -- default type (string) doesn't match value type (number)
    Number.isNaN(read(["foo"], "default", { foo: Number.NaN })),
    "given [NaN value at path with mismatched default] should [return NaN]"
  )

  t.end()
})

test("read - curried", t => {
  t.equal(
    read("lorem")({ lorem: "ipsum" }),
    "ipsum",
    "given [single key] should [return value]"
  )

  t.equal(
    read(["a", "b"])({ a: { b: "lorem" } }),
    "lorem",
    "given [deep path] should [return nested value]"
  )

  t.equal(
    read([0, "foo"])([{ foo: "bar" }]),
    "bar",
    "given [array with numeric index in path] should [return nested value]"
  )

  t.equal(
    read(["foo"])({ foo: null }),
    null,
    "given [null value at path] should [return null]"
  )

  t.equal(
    // @ts-expect-error -- testing runtime behavior with non-matching key
    read("missing")({ lorem: "ipsum" }),
    undefined,
    "given [non-existing key] should [return undefined]"
  )

  t.equal(
    // @ts-expect-error -- testing runtime behavior with undefined input
    read("missing")(undefined),
    undefined,
    "given [undefined input] should [return undefined]"
  )

  t.equal(
    // @ts-expect-error -- testing runtime behavior with null input
    read("missing")(null),
    undefined,
    "given [null input] should [return undefined]"
  )

  t.equal(
    // @ts-expect-error -- testing runtime behavior with non-object input
    read("missing")(2),
    undefined,
    "given [non-object input] should [return undefined]"
  )

  t.equal(
    // @ts-expect-error -- testing runtime behavior with non-object input and default
    read("foo", "fallback")(2),
    "fallback",
    "given [non-object input with default value] should [return default value]"
  )

  t.equal(
    // @ts-expect-error -- testing runtime behavior with null input and default
    read("foo", "fallback")(null),
    "fallback",
    "given [null input with default value] should [return default value]"
  )

  t.equal(
    // @ts-expect-error -- testing runtime behavior with undefined input and default
    read("foo", "fallback")(undefined),
    "fallback",
    "given [undefined input with default value] should [return default value]"
  )

  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  const missingDeep = read(["x", "y"])({ a: { b: "lorem" } })

  t.equal(
    missingDeep,
    undefined,
    "given [non-existing deep path] should [return undefined]"
  )

  t.equal(
    read("constructor")({}),
    undefined,
    "given [a key only on the prototype] should [return undefined]"
  )

  t.equal(
    read("toString", "fallback")({}),
    "fallback",
    "given [a key only on the prototype and a default] should [return the default]"
  )

  t.equal(
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    read(["a", "constructor"])({ a: {} }),
    undefined,
    "given [a deep path through a prototype key] should [return undefined]"
  )

  t.equal(
    read(["length"])([1, 2, 3]),
    3,
    "given [length of an array] should [return it, an array owns its length]"
  )

  {
    const path: readonly string[] = ["a", "b"]

    t.equal(
      read(path)({ a: { b: "lorem" } }),
      "lorem",
      "given [a readonly path] should [return nested value]"
    )
  }

  t.equal(
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    read(["a", "b"])({ a: "text" }),
    undefined,
    "given [a deep path through a string] should [return undefined]"
  )

  t.end()
})

test("read - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- intentionally testing wrong path type
      read(42)
    },
    /expected 'path' to be 'String' or 'Array', got 'Number'/,
    "given [a number as path] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- intentionally testing wrong path type
      read(null)
    },
    /expected 'path' to be 'String' or 'Array', got 'Null'/,
    "given [null as path] should [throw TypeError]"
  )

  t.end()
})

test("read - aliases", t => {
  t.equal(get, read, "given [get export] should [be an alias for read]")

  t.end()
})
