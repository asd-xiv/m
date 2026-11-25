import test from "tape"

import { countBy } from "./count-by.js"
import { isSomething } from "../../is/is.js"

const isEven = (input: number): boolean => input % 2 === 0

test("countBy - uncurried", t => {
  t.equal(
    countBy(isSomething, [1, 2, 3, null]),
    3,
    "given [isSomething predicate and an array with nulls] should [count truthy items]"
  )

  t.equal(
    countBy((x: number) => x > 2, [1, 2, 3, 4, 5]),
    3,
    "given [a comparison predicate and a number array] should [count matching items]"
  )

  t.equal(
    countBy(isSomething, []),
    0,
    "given [a predicate and an empty array] should [return 0]"
  )

  {
    const items = [
      { name: "Bob", score: 1, subject: "CS" },
      { name: "Alice", score: 10, subject: "Math" },
      { name: "Hatter", score: 10, subject: "Math" },
    ]

    t.equal(
      countBy(
        [(item: { score: number }) => item.score, (score: number) => score > 5],
        items
      ),
      2,
      "given [a pipe chain extracting and testing a field] should [count matching items]"
    )
  }

  t.end()
})

test("countBy - curried", t => {
  t.equal(
    countBy(isSomething)([1, 2, 3, null]),
    3,
    "given [isSomething predicate] should [return a function that counts matching items]"
  )

  t.end()
})

test("countBy - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => countBy(42, [1, 2, 3]),
    /expected 'fn' to be 'Function' or 'Array', got 'Number'/,
    "given [a number as predicate] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => countBy("foo", [1, 2, 3]),
    /expected 'fn' to be 'Function' or 'Array', got 'String'/,
    "given [a string as predicate] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => countBy(isSomething, "not-an-array"),
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => countBy(isSomething)(42),
    /expected 'input' to be 'Array', got 'Number'/,
    "given [curried predicate and a number as input] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => countBy([isEven, 1], [1, 2]),
    /@asd14\/m\/countBy: expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a pipe with a non-function] should [throw TypeError naming the function and its position]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => countBy([isEven, 1]),
    /expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a bad pipe in the curried form] should [throw at the first call]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => countBy([], [1, 2]),
    /expected 'fn' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe] should [throw TypeError]"
  )

  {
    // A predicate passes only when it returns `true`
    const toNumber = (input: number) => input

    t.deepEqual(
      // @ts-expect-error -- testing runtime validation
      countBy(toNumber, [0, 1, 2]),
      0,
      "given [a predicate returning a truthy non-boolean] should [not pass any element]"
    )
  }

  t.end()
})
