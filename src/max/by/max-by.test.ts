import test from "tape"

import { maxBy } from "./max-by.js"

type User = { id: number; age: number }

const readAge = (user: User) => user.age

const USERS: User[] = [
  { id: 1, age: 30 },
  { id: 2, age: 41 },
  { id: 3, age: 25 },
]

test("maxBy - uncurried", t => {
  t.deepEqual(
    maxBy(readAge, USERS),
    { id: 2, age: 41 },
    "given [a function and an array] should [return the item with the largest result]"
  )

  t.deepEqual(
    maxBy(readAge, [
      { id: 1, age: 41 },
      { id: 2, age: 41 },
    ]),
    { id: 1, age: 41 },
    "given [a tie] should [return the first item]"
  )

  t.equal(
    maxBy(readAge, []),
    undefined,
    "given [an empty array] should [return undefined]"
  )

  t.deepEqual(
    maxBy(readAge, [
      { id: 1, age: NaN },
      { id: 2, age: 5 },
    ]),
    { id: 2, age: 5 },
    "given [an item whose result is NaN] should [skip it]"
  )

  t.equal(
    maxBy(readAge, [{ id: 1, age: NaN }]),
    undefined,
    "given [only NaN results] should [return undefined]"
  )

  t.deepEqual(
    maxBy(
      [
        (user: { stats: { score: number } }) => user.stats,
        stats => stats.score,
      ],
      [{ stats: { score: 1 } }, { stats: { score: 9 } }]
    ),
    { stats: { score: 9 } },
    "given [a pipe array] should [compare the piped results]"
  )

  t.end()
})

test("maxBy - curried", t => {
  t.deepEqual(
    maxBy(readAge)(USERS),
    { id: 2, age: 41 },
    "given [a function, curried] should [return the item with the largest result]"
  )

  t.end()
})

test("maxBy - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      maxBy(42, USERS)
    },
    /@asd14\/m\/maxBy: expected 'fn' to be 'Function' or 'Array', got 'Number'/,
    "given [a number as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      maxBy(readAge, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [non-array input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      maxBy(() => "x", USERS)
    },
    /expected 'fn\(input\[0\]\)' to be 'Number', got 'String'/,
    "given [a result that is not a number] should [throw TypeError]"
  )

  t.end()
})
