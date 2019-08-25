import test from "tape"
import { get } from ".."

test("get", t => {
  t.equal(
    get("lorem")({
      lorem: "ipsum",
    }),
    "ipsum",
    "Get existing property"
  )

  t.equal(
    get("not-exist")({
      lorem: "ipsum",
    }),
    undefined,
    "Get non-existing property // undefined"
  )

  t.equal(
    get("not-exist")(undefined),
    undefined,
    "Get prop from undefined // undefined"
  )

  t.equal(
    get("not-exist-on-null")(null),
    undefined,
    "Get prop from null // undefined"
  )

  t.equal(
    get("not-exist")(2),
    undefined,
    "Get prop from non object // undefined"
  )

  t.equal(
    get("a", "b")({ a: { b: "lorem" } }),
    "lorem",
    "Get existing prop from nested objects"
  )

  t.equal(
    get("a", "c")({ a: { b: "lorem" } }),
    undefined,
    "Get non-existing prop from nested objects"
  )

  t.equal(
    get("0", "a")([{ a: "array element" }]),
    "array element",
    "Get existing prop from array"
  )

  t.equal(
    get("a", 0, "b")({ a: [{ b: "array element" }] }),
    "array element",
    "Get existing prop from array"
  )

  t.end()
})
