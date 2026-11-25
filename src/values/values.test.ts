import test from "tape"

import { values } from "./values.js"

test("values - uncurried", t => {
  t.deepEqual(
    values(["lorem", "ipsum"]),
    ["lorem", "ipsum"],
    "given [an array] should [return its items]"
  )

  t.deepEqual(
    values({ foo: "bar", lorem: "ipsum" }),
    ["bar", "ipsum"],
    "given [an object] should [return its values in key order]"
  )

  t.deepEqual(
    values({}),
    [],
    "given [an empty object] should [return empty array]"
  )

  t.deepEqual(
    values([]),
    [],
    "given [an empty array] should [return empty array]"
  )

  {
    const input: readonly string[] = ["a", "b"]

    t.deepEqual(
      values(input),
      ["a", "b"],
      "given [a readonly array] should [return its items]"
    )
  }

  t.deepEqual(
    values(JSON.parse('{ "__proto__": 1, "a": 2 }') as Record<string, unknown>),
    [1, 2],
    "given [an object with an own __proto__ key] should [list its value as any other]"
  )

  {
    const input = { a: 1 }
    const result = values(input)

    t.deepEqual(
      [result, input],
      [[1], { a: 1 }],
      "given [an object] should [leave it unchanged]"
    )
  }

  t.end()
})

test("values - invalid input", t => {
  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => values("lorem"),
    /expected 'input' to be 'Array' or 'Object', got 'String'/,
    "given [a string] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => values(12),
    /expected 'input' to be 'Array' or 'Object', got 'Number'/,
    "given [a number] should [throw TypeError]"
  )

  class User {
    name = "lorem"
  }

  for (const [input, name] of [
    [new Map([["foo", "bar"]]), "Map"],
    [new Set(["foo"]), "Set"],
    [new Date(0), "Date"],
    [new User(), "User"],
  ] as const) {
    t.throws(
      // @ts-expect-error -- testing runtime validation
      () => values(input),
      new RegExp(`expected 'input' to be 'Array' or 'Object', got '${name}'`),
      `given [a ${name}] should [throw TypeError naming it]`
    )
  }

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => values(null),
    /expected 'input' to be 'Array' or 'Object', got 'Null'/,
    "given [null] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => values(undefined),
    /expected 'input' to be 'Array' or 'Object', got 'Undefined'/,
    "given [undefined] should [throw TypeError]"
  )

  t.end()
})
