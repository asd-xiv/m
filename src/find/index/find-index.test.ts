import test from "tape"

import { findIndex } from "./find-index.js"
import { isSomething } from "../../is/is.js"

const isEven = (input: number): boolean => input % 2 === 0

const COMMENTS = [
  { id: 1, body: "" },
  { id: 2, body: "dolor" },
]

test("findIndex - uncurried", t => {
  t.equal(
    findIndex((element: { id: number }) => element.id === 2, COMMENTS),
    1,
    "given [uncurried predicate matching id:2] should [return index 1]"
  )

  t.equal(
    findIndex(
      [(element: { id: number }) => element.id, (item: number) => item === 2],
      COMMENTS
    ),
    1,
    "given [predicate pipe, uncurried] should [return index 1]"
  )

  t.end()
})

test("findIndex - curried", t => {
  t.equal(
    findIndex((element: { id: number }) => element.id === 2)(COMMENTS),
    1,
    "given [curried predicate matching id:2] should [return index 1]"
  )

  t.equal(
    findIndex((element: { id: number }) => element.id === 3)(COMMENTS),
    -1,
    "given [predicate matching no element] should [return -1]"
  )

  t.equal(
    findIndex(isSomething)([null, undefined, "found"]),
    2,
    "given [isSomething predicate] should [return index of first truthy value]"
  )

  t.end()
})

test("findIndex - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      findIndex(42, [1, 2])
    },
    /expected 'fn' to be 'Function' or 'Array', got 'Number'/,
    "given [a number as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      findIndex(isSomething, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => findIndex([isEven, 1], [1, 2]),
    /@asd14\/m\/findIndex: expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a pipe with a non-function] should [throw TypeError naming the function and its position]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => findIndex([isEven, 1]),
    /expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a bad pipe in the curried form] should [throw at the first call]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => findIndex([], [1, 2]),
    /expected 'fn' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe] should [throw TypeError]"
  )

  {
    // A predicate passes only when it returns `true`
    const toNumber = (input: number) => input

    t.deepEqual(
      // @ts-expect-error -- testing runtime validation
      findIndex(toNumber, [0, 1, 2]),
      -1,
      "given [a predicate returning a truthy non-boolean] should [not pass any element]"
    )
  }

  t.end()
})
