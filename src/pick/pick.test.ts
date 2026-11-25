import test from "tape"

import { pick } from "./pick.js"

test("pick - uncurried", t => {
  t.deepEqual(
    pick(["name", "age"], { name: "Alice", age: 30, role: "admin" }),
    { name: "Alice", age: 30 },
    "given [existing keys and an object] should [return object with only those keys]"
  )

  const loose: Record<string, unknown> = { name: "Alice", age: 30 }

  t.deepEqual(
    pick(["name", "missing"], loose),
    { name: "Alice" },
    "given [some keys missing from object] should [skip missing keys]"
  )

  const empty: Record<string, unknown> = {}

  t.deepEqual(
    pick(["name", "age"], empty),
    {},
    "given [keys and an empty object] should [return empty object]"
  )

  const source: Record<string, unknown> = { name: "Alice", age: 30 }

  t.deepEqual(
    pick([], source),
    {},
    "given [empty keys array] should [return empty object]"
  )

  t.deepEqual(
    pick(["toString", "constructor"], source),
    {},
    "given [keys only on the prototype] should [skip them]"
  )

  t.deepEqual(
    pick(["a"], { a: undefined }),
    { a: undefined },
    "given [an own key with undefined] should [keep it]"
  )

  {
    const keys: readonly "name"[] = ["name"]

    t.deepEqual(
      pick(keys, { name: "Alice", age: 30 }),
      { name: "Alice" },
      "given [a readonly array of keys] should [return object with those keys]"
    )
  }

  {
    const polluted = JSON.parse(
      '{ "__proto__": { "x": 1 }, "a": 1 }'
    ) as Record<string, unknown>
    const picked = pick(["__proto__"], polluted)

    t.deepEqual(
      Object.keys(picked),
      ["__proto__"],
      "given [an own __proto__ key] should [keep it as an own key]"
    )
    t.equal(
      Object.getPrototypeOf(picked),
      Object.prototype,
      "given [an own __proto__ key] should [leave the prototype alone]"
    )
  }

  t.end()
})

test("pick - curried", t => {
  const pickNameAge = pick(["name", "age"])

  t.deepEqual(
    pickNameAge({ name: "Alice", age: 30, role: "admin" }),
    { name: "Alice", age: 30 },
    "given [keys] should [return a function that picks those keys from input]"
  )

  t.end()
})

test("pick - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => pick("name", { name: "Alice" }),
    /expected 'keys' to be 'Array', got 'String'/,
    "given [a string as keys] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => pick(42, { name: "Alice" }),
    /expected 'keys' to be 'Array', got 'Number'/,
    "given [a number as keys] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => pick(undefined),
    /expected 'keys' to be 'Array', got 'Undefined'/,
    "given [undefined as keys] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => pick(["name"], "Alice"),
    /expected 'input' to be 'Object', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => pick(["name"], new Date()),
    /expected 'input' to be 'Object', got 'Date'/,
    "given [a Date as input] should [throw TypeError, a Date is not plain]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => pick(["name"])(null),
    /expected 'input' to be 'Object', got 'Null'/,
    "given [null as curried input] should [throw TypeError]"
  )

  t.end()
})
