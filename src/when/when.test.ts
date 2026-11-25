import test from "tape"

import { when } from "./when.js"

const isOdd = (input: number) => input % 2 !== 0
const inc = (input: number) => input + 1
const dec = (input: number) => input - 1

test("when - uncurried", t => {
  t.equal(
    when(isOdd, inc, dec, 5),
    6,
    'given [odd input with "then" & "else" defined] should [run thenFn]'
  )

  t.equal(
    when(isOdd, "yes", "no", 5),
    "yes",
    'given [odd input with primitive "then" & "else"] should [return "then" value]'
  )

  t.equal(
    when(isOdd, "yes", "no", 6),
    "no",
    'given [even input with primitive "then" & "else"] should [return "else" value]'
  )

  t.end()
})

test("when - curried", t => {
  t.equal(
    when(isOdd, inc, dec)(5),
    6,
    'given [odd input with "then" & "else"] should [run thenFn]'
  )

  t.equal(
    when(isOdd, inc, dec)(6),
    5,
    'given [even input with "then" & "else"] should [run elseFn]'
  )

  t.equal(
    when(isOdd, inc)(5),
    6,
    'given [odd input with only "then"] should [run thenFn]'
  )

  t.equal(
    when(isOdd, inc)(6),
    6,
    'given [even input with only "then"] should [return input unchanged (identity)]'
  )

  t.equal(
    when(isOdd, [inc, inc], dec)(5),
    7,
    'given ["then" as a pipe array] should [compose and run pipe]'
  )

  t.equal(
    when(isOdd, inc, [dec, dec])(6),
    4,
    'given ["else" as a pipe array] should [compose and run pipe]'
  )

  t.equal(
    when([inc, isOdd], inc, dec)(4),
    5,
    'given ["predicate" as a pipe array] should [compose and run pipe]'
  )

  t.equal(
    when(isOdd, 0, 1)(5),
    0,
    'given [a falsy primitive as "then"] should [return it as is]'
  )

  t.deepEqual(
    when(isOdd, () => ["x"])(5),
    ["x"],
    'given ["then" returning an array] should [return the array]'
  )

  t.end()
})

test("when - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => when(42, inc, dec, 5),
    /expected 'predicate' to be 'Function' or 'Array', got 'Number'/,
    "given [a number as predicate] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => when("foo", inc, dec, 5),
    /expected 'predicate' to be 'Function' or 'Array', got 'String'/,
    "given [a string as predicate] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => when(null, inc, dec, 5),
    /expected 'predicate' to be 'Function' or 'Array', got 'Null'/,
    "given [null as predicate] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing a missing branch
    () => when(isOdd),
    /@asd14\/m\/when: expected 'thenFn' to be 'Function' or 'Primitive', got 'Missing'/,
    "given [only a predicate] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing a bad pipe slot
    () => when(isOdd, [inc, 1], dec),
    /@asd14\/m\/when: expected 'thenFn\[1\]' to be 'Function', got 'Number'/,
    "given [a pipe array with a number as thenFn] should [name the slot]"
  )

  t.throws(
    () => when(isOdd, inc, []),
    /@asd14\/m\/when: expected 'elseFn' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe as elseFn] should [throw TypeError]"
  )

  t.equal(
    // @ts-expect-error -- a predicate returning a truthy non-boolean
    when(() => 1, "yes", "no", 5),
    "no",
    "given [a predicate returning 1] should [run elseFn, only true passes]"
  )

  t.end()
})
