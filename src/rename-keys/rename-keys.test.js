import test from "tape"

import { renameKeys } from "./rename-keys"

test("renameKeys", t => {
  t.deepEqual(
    renameKeys({ test: "changed" }, { test: "Lorem Ipsum" }),
    { changed: "Lorem Ipsum" },
    "Renaming existing key shoud return new object with new key and old key deleted (uncurried)"
  )

  t.deepEqual(
    renameKeys({ test: "changed" })({ test: "Lorem Ipsum" }),
    { changed: "Lorem Ipsum" },
    "Renaming existing key shoud return new object with new key and old key deleted (curried)"
  )

  t.deepEqual(
    renameKeys({ notExist: "changed" }, { test: "Lorem Ipsum" }),
    { test: "Lorem Ipsum" },
    "Renaming non-existing key shoud return new object with same values"
  )

  t.deepEqual(
    renameKeys({ test: "changed" }, [
      { test: "Lorem Ipsum" },
      { cant: "touch this" },
    ]),
    [{ changed: "Lorem Ipsum" }, { cant: "touch this" }],
    "Renaming key on array of objects shoud return new array with updated objects"
  )

  t.end()
})
