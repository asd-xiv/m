/* eslint-disable unicorn/no-null */

import test from "tape"

import { read, readMany } from "./read.js"

test("read", t => {
  t.deepEqual(
    read("lorem")({ lorem: "ipsum" }),
    "ipsum",
    "given [object], reading property should [return value of property]"
  )

  t.deepEqual(
    read("not-exist")({ lorem: "ipsum" }),
    undefined,
    "given [object], reading non-existing property should [return undefined]"
  )

  t.deepEqual(
    read("not-exist")(),
    undefined,
    "given [undefined], reading property should [return undefined]"
  )

  t.deepEqual(
    read("not-exist")(null),
    undefined,
    "given [null], reading property should [return undefined]"
  )

  t.deepEqual(
    read("not-exist")(2),
    undefined,
    "given [number], reading property should [return undefined]"
  )

  t.deepEqual(
    read(["a", "b"])({ a: { b: "lorem" } }),
    "lorem",
    "given [object], reading property should [return value of property]"
  )

  t.deepEqual(
    read(["x", "y"])({ a: { b: "lorem" } }),
    undefined,
    "given [object], reading non-existing property path should [return undefined]"
  )

  t.deepEqual(
    read(["a", "c"], "dolor", {}),
    "dolor",
    "given [object], reading non-existing property path with default value set should [return default value]"
  )

  t.deepEqual(
    read([0, "foo"])([{ foo: "bar" }]),
    "bar",
    "given [array of objects], reading property path should [return value of property]"
  )

  t.deepEqual(
    read(["foo", "0", "lorem"])({ foo: [{ lorem: "ipsum" }] }),
    "ipsum",
    "given [object with array values], reading property path should [return value of property]"
  )

  t.deepEqual(
    read(["foo"])({ foo: null }),
    null,
    "given [objects], reading property path of key who's value is null should [return null]"
  )

  t.deepEqual(
    read(["foo"], "default value", { foo: null }),
    null,
    "given [objects], reading property path of key who's value is null with default value set should [return null]"
  )

  t.deepEqual(
    read(["foo"], "default value", { foo: Number.NaN }),
    Number.NaN,
    "given [objects], reading property path of key who's value is NaN with default value set should [return null]"
  )

  t.end()
})

test("readMany", t => {
  t.deepEqual(
    readMany("id")([{ id: "1" }, { id: "2" }, { foo: "bar" }]),
    ["1", "2", undefined],
    "given [array of objects] reading sometime existing property should [return array with property value of each object]"
  )

  t.deepEqual(
    readMany(["id"], "default-id", [
      { id: "1" },
      { id: "2" },
      { id: null, foo: "bar" },
      { foo: "bar" },
    ]),
    ["1", "2", null, "default-id"],
    "given [array of objects] reading sometime existing property path should [return array with property value of each object]"
  )

  t.end()
})
