/* eslint-disable new-cap */

import { describe } from "riteway"
import { rename, renameMany } from "./rename"

describe("rename", async assert => {
  assert({
    given: "object, renaming an existing property",
    should: "return new object with renamed property",
    actual: rename({ test: "changed" }, { test: "Lorem Ipsum" }),
    expected: { changed: "Lorem Ipsum" },
  })

  assert({
    given: "object, renaming an non-existing property",
    should: "return new object with same properties",
    actual: rename({ notExist: "test" })({ test: "Lorem Ipsum" }),
    expected: { test: "Lorem Ipsum" },
  })

  assert({
    given: "object, renaming an existing property to another existing property",
    should: "return new object with renamed property",
    actual: rename({ foo: "lorem" }, { foo: "bar", lorem: "ipsum" }),
    expected: { lorem: "bar" },
  })
})

describe("renameMany", async assert => {
  assert({
    given: "array of objects, renaming an existing property",
    should: "return new array of objects with renamed properties",
    actual: renameMany({ test: "changed" }, [
      { test: "Lorem Ipsum" },
      { cant: "touch this" },
    ]),
    expected: [{ changed: "Lorem Ipsum" }, { cant: "touch this" }],
  })
})
