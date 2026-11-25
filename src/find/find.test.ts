import test from "tape"

import { find } from "./find.js"
import { isSomething } from "../is/is.js"

const isEven = (input: number): boolean => input % 2 === 0

test("find - uncurried", t => {
  t.deepEqual(
    find(
      (item: { id: number; body: string }) => item.id === 2,
      [
        { id: 1, body: "" },
        { id: 2, body: "dolor" },
      ]
    ),
    { id: 2, body: "dolor" },
    "given [uncurried predicate matching id:2] should [return the matching element]"
  )

  t.deepEqual(
    find(
      [(item: { id: number }) => item.id, (id: number) => id === 2],
      [{ id: 1 }, { id: 2 }, { id: 3 }]
    ),
    { id: 2 },
    "given [predicate pipe, uncurried] should [return the matching element]"
  )

  t.end()
})

test("find - curried", t => {
  t.deepEqual(
    find((item: { id: number }) => item.id === 2)([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]),
    { id: 2 },
    "given [curried predicate matching id:2] should [return the matching element]"
  )

  t.equal(
    find((item: { id: number }) => item.id === 99)([{ id: 1 }, { id: 2 }]),
    undefined,
    "given [predicate matching no element] should [return undefined]"
  )

  t.deepEqual(
    find(isSomething)([null, undefined, "found", "also"]),
    "found",
    "given [isSomething predicate] should [return first non-null/undefined value]"
  )

  t.equal(
    find(isSomething)([null, undefined]),
    undefined,
    "given [no matching elements] should [return undefined]"
  )

  t.end()
})

test("find - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      find(42, [1, 2])
    },
    /expected 'fn' to be 'Function' or 'Array', got 'Number'/,
    "given [a number as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      find(isSomething, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => find([isEven, 1], [1, 2]),
    /@asd14\/m\/find: expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a pipe with a non-function] should [throw TypeError naming the function and its position]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => find([isEven, 1]),
    /expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a bad pipe in the curried form] should [throw at the first call]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => find([], [1, 2]),
    /expected 'fn' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe] should [throw TypeError]"
  )

  {
    // A predicate passes only when it returns `true`
    const toNumber = (input: number) => input

    t.deepEqual(
      // @ts-expect-error -- testing runtime validation
      find(toNumber, [0, 1, 2]),
      undefined,
      "given [a predicate returning a truthy non-boolean] should [not pass any element]"
    )
  }

  t.end()
})
