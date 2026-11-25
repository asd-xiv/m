import test from "tape"

import { count, length, size } from "./count.js"

test("count - uncurried", t => {
  t.equal(
    count([1, 2, 3]),
    3,
    "given [a number array] should [return the number of elements]"
  )

  t.equal(count([] as number[]), 0, "given [an empty array] should [return 0]")

  t.equal(
    count([1, null, "a", undefined]),
    4,
    "given [a mixed array] should [return the total number of elements]"
  )

  t.equal(
    count("hello"),
    5,
    "given [a string] should [return the number of characters]"
  )

  t.equal(count(""), 0, "given [an empty string] should [return 0]")

  t.end()
})

test("count - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => count(42),
    /expected 'input' to be 'Array' or 'String', got 'Number'/,
    "given [a number] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => count({ a: 1 }),
    /expected 'input' to be 'Array' or 'String', got 'Object'/,
    "given [an object] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => count(undefined),
    /expected 'input' to be 'Array' or 'String', got 'Undefined'/,
    "given [undefined] should [throw TypeError]"
  )

  t.end()
})

test("count - aliases", t => {
  t.equal(length, count, "given [length export] should [be an alias for count]")
  t.equal(size, count, "given [size export] should [be an alias for count]")
  t.end()
})
