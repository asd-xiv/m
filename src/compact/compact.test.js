/* eslint-disable unicorn/no-null */
import test from "tape"

import { compact, compactMany } from "./compact"

const lambda = () => null

test("compact", t => {
  t.deepEqual(
    compact({
      b: null,
      c: undefined,
    }),
    {},
    "Compacting an object should return compacted object"
  )

  t.deepEqual(
    compact({
      a: "Lorem Ipsum",
      b: null,
      c: undefined,
      d: false,
      f: lambda,
    }),
    { a: "Lorem Ipsum", d: false, f: lambda },
    "Compacting an object should return compacted object"
  )

  t.deepEqual(
    compact([1, null, undefined, false, "a", lambda]),
    [1, false, "a", lambda],
    "Compacting an array should return compacted array"
  )

  t.deepEqual(compact("Lorem"), "Lorem", "Compacting an string does nothing")

  t.deepEqual(compact(""), "", "Compacting an empty string does nothing")

  t.deepEqual(compact(false), false, "Compacting a boolean does nothing")

  t.deepEqual(compact(lambda), lambda, "Compacting a function does nothing")

  t.end()
})

test("compactMany", t => {
  t.deepEqual(
    compactMany([
      [1, null, undefined, false, "a", lambda],
      { a: "Lorem Ipsum", b: null, c: undefined, d: false, f: lambda },
      "Lorem",
      "",
      false,
      lambda,
    ]),
    [
      [1, false, "a", lambda],
      { a: "Lorem Ipsum", d: false, f: lambda },
      "Lorem",
      "",
      false,
      lambda,
    ],
    "Compacting an array of things compacts each of them"
  )

  t.end()
})
