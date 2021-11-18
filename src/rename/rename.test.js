/* eslint-disable new-cap */

import test from "tape"

import { rename, renameMany } from "./rename.js"

test("rename", t => {
  t.deepEqual(
    rename({ test: "changed" }, { test: "Lorem Ipsum" }),
    { changed: "Lorem Ipsum" },
    "given [object] renaming an existing property should [return new object with renamed property]"
  )

  t.deepEqual(
    rename({ notExist: "test" })({ test: "Lorem Ipsum" }),
    { test: "Lorem Ipsum" },
    "given [object] renaming an non-existing property should [return new object with same properties]"
  )

  t.deepEqual(
    rename({ foo: "lorem" }, { foo: "bar", lorem: "ipsum" }),
    { lorem: "bar" },
    "given [object] renaming an existing property to another existing property should [return new object with renamed property]"
  )

  t.end()
})

test("renameMany", t => {
  t.deepEqual(
    renameMany({ test: "changed" }, [
      { test: "Lorem Ipsum" },
      { cant: "touch this" },
    ]),
    [{ changed: "Lorem Ipsum" }, { cant: "touch this" }],
    "given [array of objects] renaming an existing property should [return new array of objects with renamed properties]"
  )

  t.end()
})
