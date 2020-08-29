import test from "tape"
import { read } from ".."

test("read", t => {
  t.equal(
    read("lorem")({
      lorem: "ipsum",
    }),
    "ipsum",
    "Get existing property"
  )

  t.equal(
    read("not-exist")({
      lorem: "ipsum",
    }),
    undefined,
    "Get non-existing property // undefined"
  )

  t.equal(
    read("not-exist")(undefined),
    undefined,
    "Get prop from undefined // undefined"
  )

  t.equal(
    read("not-exist-on-null")(null),
    undefined,
    "Get prop from null // undefined"
  )

  t.equal(
    read("not-exist")(2),
    undefined,
    "Get prop from non object // undefined"
  )

  t.equal(
    read(["a", "b"])({ a: { b: "lorem" } }),
    "lorem",
    "Get existing prop from nested objects"
  )

  t.equal(
    read(["a", "c"])({ a: { b: "lorem" } }),
    undefined,
    "Get non-existing prop from nested objects"
  )

  t.equal(
    read(["a", "c"], "dolor")({ a: { b: "lorem" } }),
    "dolor",
    "Get non-existing prop with default from nested objects"
  )

  t.equal(
    read(["0", "a"])([{ a: "array element" }]),
    "array element",
    "Get existing prop from array"
  )

  t.equal(
    read(["a", 0, "b"])({ a: [{ b: "array element" }] }),
    "array element",
    "Get existing prop from array"
  )

  t.equal(
    read(["a"])({ a: null }),
    null,
    "Get existing prop from object that is also null"
  )

  t.equal(
    read(["a"], "default value")({ a: null }),
    "default value",
    "Get existing prop from object that is also null with default value"
  )

  t.equal(
    read(["a"], "default value")({ a: NaN }),
    "default value",
    "Get existing prop from object that is also NaN with default value"
  )

  t.equal(
    read(["a", "b"], "default value")({}),
    "default value",
    "Get existing prop from object that is also NaN with default value"
  )

  t.ok(
    Number.isNaN(read(["a"])({ a: NaN })),
    "Get existing prop from object that is also NaN"
  )

  t.end()
})
