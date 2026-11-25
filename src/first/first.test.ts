import test from "tape"

import { first, head } from "./first.js"

test("first - uncurried", t => {
  t.equal(
    first([1, 2, 3]),
    1,
    "given [a number array] should [return the first element]"
  )

  t.equal(
    first([] as number[]),
    undefined,
    "given [an empty array] should [return undefined]"
  )

  t.equal(
    first(["a", "b", "c"]),
    "a",
    "given [a string array] should [return the first element]"
  )

  t.equal(
    first("xyz"),
    "x",
    "given [a string] should [return the first character]"
  )

  t.equal(
    first(""),
    undefined,
    "given [an empty string] should [return undefined]"
  )

  t.end()
})

test("first - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => first(42),
    /expected 'input' to be 'Array' or 'String', got 'Number'/,
    "given [a number] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => first({ a: 1 }),
    /expected 'input' to be 'Array' or 'String', got 'Object'/,
    "given [an object] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => first(undefined),
    /expected 'input' to be 'Array' or 'String', got 'Undefined'/,
    "given [undefined] should [throw TypeError]"
  )

  t.end()
})

test("first - aliases", t => {
  t.equal(head, first, "given [head export] should [be an alias for first]")
  t.end()
})
