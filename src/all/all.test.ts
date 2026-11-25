import test from "tape"

import { all } from "./all.js"
import { isSomething } from "../is/is.js"

const isEven = (input: number) => input % 2 === 0

test("all - uncurried", t => {
  t.equal(
    all(item => isEven(item), [2, 6, 4]),
    true,
    "given [isEven predicate and an array of even numbers] should [return true]"
  )

  t.equal(
    all(item => isSomething(item.id), [{}, { id: 2 }, { id: null }]),
    false,
    "given [a predicate asserting the existance of .id field and an object array with elements missing .id field] should [return false]"
  )

  t.equal(
    all([item => item.id, item => !!item], [{ id: 1 }, { id: 2 }, { id: 3 }]),
    true,
    "given [a predicate pipe asserting the existance of .id field and an object array with all elements having .id field] should [return true]"
  )

  t.end()
})

test("all - curried", t => {
  t.equal(
    all(isEven)([2, 6, 4]),
    true,
    "given [curried isEven predicate and an array of even numbers] should [return true]"
  )

  t.equal(
    all<{ id?: unknown }>(item => isSomething(item.id))([
      {},
      { id: 2 },
      { id: null },
    ]),
    false,
    "given [a curried predicate asserting the existance of .id field and an object array with elements missing .id field] should [return false]"
  )

  t.end()
})

test("all - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => all(42, [1, 2, 3]),
    /expected 'fn' to be 'Function' or 'Array', got 'Number'/,
    "given [a number as predicate] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => all("foo", [1, 2, 3]),
    /expected 'fn' to be 'Function' or 'Array', got 'String'/,
    "given [a string as predicate] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => all(null, [1, 2, 3]),
    /expected 'fn' to be 'Function' or 'Array', got 'Null'/,
    "given [null as predicate] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => all(isEven, 4),
    /expected 'input' to be 'Array', got 'Number'/,
    "given [a single value instead of an array] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => all(isEven)(6),
    /expected 'input' to be 'Array', got 'Number'/,
    "given [curried predicate and a single value instead of an array] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => all([isEven, 1], [1, 2]),
    /@asd14\/m\/all: expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a pipe with a non-function] should [throw TypeError naming the function and its position]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => all([isEven, 1]),
    /expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a bad pipe in the curried form] should [throw at the first call]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => all([], [1, 2]),
    /expected 'fn' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe] should [throw TypeError]"
  )

  t.equal(
    // @ts-expect-error -- testing runtime validation
    all((input: number) => input, [1, 2]),
    false,
    "given [a predicate returning a truthy non-boolean] should [not pass]"
  )

  t.end()
})
