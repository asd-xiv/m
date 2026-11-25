import test from "tape"

import { any, has } from "./any.js"

const isEven = (input: number): boolean => input % 2 === 0

const isNumber = (input: unknown): boolean => Number.isFinite(input)

test("any - uncurried", t => {
  t.equal(
    any(isNumber, [1, "string", Number.NaN]),
    true,
    "given [isNumber predicate and a mixed array] should [return true]"
  )

  t.equal(
    any(isNumber, [null, "2", {}]),
    false,
    "given [isNumber predicate and an array with no numbers] should [return false]"
  )

  t.equal(
    any(1, [1, "string", Number.NaN]),
    true,
    "given [a value and an array containing that value] should [return true]"
  )

  t.equal(
    any("missing", [1, "string", Number.NaN]),
    false,
    "given [a value and an array not containing that value] should [return false]"
  )

  t.equal(
    any(
      [
        (item: { boolFlag?: boolean }) => item.boolFlag,
        (flag: boolean | undefined) => flag === true,
      ],
      [{ boolFlag: false }, { other: 1 }, { boolFlag: true }]
    ),
    true,
    "given [a predicate pipe extracting a field and an array with a matching element] should [return true]"
  )

  t.equal(
    any(Number.NaN, [1, Number.NaN]),
    true,
    "given [NaN and an array containing NaN] should [return true, SameValueZero as Array.prototype.includes]"
  )

  t.end()
})

test("any - curried", t => {
  t.equal(
    any(isNumber)([1, "string", Number.NaN]),
    true,
    "given [isNumber predicate and a mixed array, curried] should [return true]"
  )

  t.equal(
    any(1)([1, 2, 3]),
    true,
    "given [a value and an array containing that value, curried] should [return true]"
  )

  t.end()
})

test("any - invalid input", t => {
  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => any(isNumber, 2),
    /expected 'input' to be 'Array', got 'Number'/,
    "given [a single value instead of an array] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => any(isNumber)("string"),
    /expected 'input' to be 'Array', got 'String'/,
    "given [curried predicate and a string as input] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => any([isEven, 1], [1, 2]),
    /@asd14\/m\/any: expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a pipe with a non-function] should [throw TypeError naming the function and its position]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => any([isEven, 1]),
    /expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a bad pipe in the curried form] should [throw at the first call]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => any([], [1, 2]),
    /expected 'fn' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe] should [throw TypeError]"
  )

  t.equal(
    // @ts-expect-error -- testing runtime validation
    any((input: number) => input, [1, 2]),
    false,
    "given [a predicate returning a truthy non-boolean] should [not pass]"
  )

  t.throws(
    // @ts-expect-error -- an array is a pipe, not a value
    () => any([1, 2], [[1, 2]]),
    /@asd14\/m\/any: expected 'fn\[0\]' to be 'Function', got 'Number'/,
    "given [an array as the value] should [throw, an array in the first slot is a pipe]"
  )

  t.end()
})

test("any - aliases", t => {
  t.equal(has, any, "given [has export] should [be an alias for any]")

  t.end()
})
