import test from "tape"

import { keys } from "./keys.js"

test("keys - uncurried", t => {
  t.deepEqual(
    keys(["lorem", "ipsum"]),
    ["0", "1"],
    "given [an array] should [return string indices]"
  )

  t.deepEqual(
    keys({ foo: "bar", lorem: "ipsum" }),
    ["foo", "lorem"],
    "given [an object] should [return key names]"
  )

  t.deepEqual(
    keys({}),
    [],
    "given [an empty object] should [return empty array]"
  )

  t.deepEqual(
    keys([]),
    [],
    "given [an empty array] should [return empty array]"
  )

  {
    const input: readonly string[] = ["a", "b"]

    t.deepEqual(
      keys(input),
      ["0", "1"],
      "given [a readonly array] should [return string indices]"
    )
  }

  t.deepEqual(
    keys(JSON.parse('{ "__proto__": 1, "a": 2 }') as Record<string, unknown>),
    ["__proto__", "a"],
    "given [an object with an own __proto__ key] should [list it as any other key]"
  )

  t.end()
})

test("keys - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => keys("lorem"),
    /expected 'input' to be 'Array' or 'Object'/,
    "given [a string] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => keys(12),
    /expected 'input' to be 'Array' or 'Object'/,
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
      // @ts-expect-error -- intentionally testing wrong input type
      () => keys(input),
      new RegExp(`expected 'input' to be 'Array' or 'Object', got '${name}'`),
      `given [a ${name}] should [throw TypeError naming it]`
    )
  }

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => keys(null),
    /expected 'input' to be 'Array' or 'Object'/,
    "given [null] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => keys(undefined),
    /expected 'input' to be 'Array' or 'Object'/,
    "given [undefined] should [throw TypeError]"
  )

  t.end()
})
