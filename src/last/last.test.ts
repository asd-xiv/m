import test from "tape"

import { last, tail } from "./last.js"

test("last - uncurried", t => {
  t.equal(
    last([1, 2, 3]),
    3,
    "given [a number array] should [return the last element]"
  )

  t.equal(
    last([1]),
    1,
    "given [a single element array] should [return that element]"
  )

  t.equal(
    last([] as number[]),
    undefined,
    "given [an empty array] should [return undefined]"
  )

  t.equal(
    last(["a", "b", "c"]),
    "c",
    "given [a string array] should [return the last element]"
  )

  t.equal(
    last("xyz"),
    "z",
    "given [a string] should [return the last character]"
  )

  t.equal(
    last(""),
    undefined,
    "given [an empty string] should [return undefined]"
  )

  t.end()
})

test("last - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => last(42),
    /expected 'input' to be 'Array' or 'String', got 'Number'/,
    "given [a number] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => last({ a: 1 }),
    /expected 'input' to be 'Array' or 'String', got 'Object'/,
    "given [an object] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => last(undefined),
    /expected 'input' to be 'Array' or 'String', got 'Undefined'/,
    "given [undefined] should [throw TypeError]"
  )

  t.end()
})

test("last - aliases", t => {
  t.equal(tail, last, "given [tail export] should [be an alias for last]")
  t.end()
})
