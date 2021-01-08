import { describe } from "riteway"

import { read, readMany } from "./read"

describe("read", async assert => {
  assert({
    given: "object as source, reading property",
    should: "return value of property",
    actual: read("lorem")({
      lorem: "ipsum",
    }),
    expected: "ipsum",
  })

  assert({
    given: "object as source, reading non-existing property",
    should: "return undefined",
    actual: read("not-exist")({
      lorem: "ipsum",
    }),
    expected: undefined,
  })

  assert({
    given: "undefined as source, reading property",
    should: "return undefined",
    actual: read("not-exist")(undefined),
    expected: undefined,
  })

  assert({
    given: "null as source, reading property",
    should: "return undefined",
    actual: read("not-exist")(null),
    expected: undefined,
  })

  assert({
    given: "number as source, reading property",
    should: "return undefined",
    actual: read("not-exist")(2),
    expected: undefined,
  })

  assert({
    given: "object as source, reading property path",
    should: "return value of property",
    actual: read(["a", "b"])({ a: { b: "lorem" } }),
    expected: "lorem",
  })

  assert({
    given: "object as source, reading non-existing property path",
    should: "return undefined",
    actual: read(["x", "y"])({ a: { b: "lorem" } }),
    expected: undefined,
  })

  assert({
    given:
      "object as source, reading non-existing property path with default value set",
    should: "return default value",
    actual: read(["a", "c"], "dolor", {}),
    expected: "dolor",
  })

  assert({
    given: "array of objects as source, reading property path",
    should: "return value of property",
    actual: read([0, "foo"])([{ foo: "bar" }]),
    expected: "bar",
  })

  assert({
    given: "object with array values as source, reading property path",
    should: "return value of property",
    actual: read(["foo", "0", "lorem"])({ foo: [{ lorem: "ipsum" }] }),
    expected: "ipsum",
  })

  assert({
    given: "object as source, reading property path of key who's value is null",
    should: "return null",
    actual: read(["foo"])({ foo: null }),
    expected: null,
  })

  assert({
    given:
      "object as source, reading property path of key who's value is null with default value set",
    should: "return null",
    actual: read(["foo"], "default value", { foo: null }),
    expected: null,
  })

  assert({
    given:
      "object as source, reading property path of key who's value is NaN with default value set",
    should: "return null",
    actual: read(["foo"], "default value", { foo: NaN }),
    expected: NaN,
  })
})

describe("readMany", async assert => {
  assert({
    given: "array of objects as source, reading sometime existing property",
    should: "return array with property value of each object",
    actual: readMany("id")([{ id: "1" }, { id: "2" }, { foo: "bar" }]),
    expected: ["1", "2", undefined],
  })

  assert({
    given:
      "array of objects as source, reading sometime existing property path",
    should: "return array with property value of each object",
    actual: readMany(["id"], "default-id", [
      { id: "1" },
      { id: "2" },
      { id: null, foo: "bar" },
      { foo: "bar" },
    ]),
    expected: ["1", "2", null, "default-id"],
  })
})
