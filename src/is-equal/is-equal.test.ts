import test from "tape"

import { isEqual } from "./is-equal.js"

test("isEqual - uncurried", t => {
  t.equal(
    isEqual(2, 2),
    true,
    "given [two equal numbers, uncurried] should [return true]"
  )

  t.equal(
    isEqual(Number.NaN, Number.NaN),
    true,
    "given [two NaN values] should [return true]"
  )

  t.equal(
    isEqual(0, -0),
    true,
    "given [0 and -0] should [return true, as SameValueZero]"
  )

  t.equal(
    isEqual(1, 2),
    false,
    "given [two different numbers] should [return false]"
  )

  t.equal(
    isEqual(Number.NaN, 0),
    false,
    "given [NaN and a number] should [return false]"
  )

  t.equal(
    isEqual(null, null),
    true,
    "given [two null values] should [return true]"
  )

  t.equal(
    isEqual(undefined, undefined),
    true,
    "given [two undefined values] should [return true]"
  )

  t.end()
})

test("isEqual - curried", t => {
  t.equal(
    isEqual(2)(2),
    true,
    "given [two equal numbers, curried] should [return true]"
  )

  t.equal(
    // @ts-expect-error -- intentionally testing cross-type comparison at runtime
    isEqual("2")(2),
    false,
    "given [a string and a number with same value] should [return false]"
  )

  t.equal(
    isEqual(Number.NaN)(Number.NaN),
    true,
    "given [two NaN values, curried] should [return true]"
  )

  t.equal(
    isEqual(undefined)(undefined),
    true,
    "given [two undefined values, curried] should [return true]"
  )

  t.equal(
    isEqual([1])([1]),
    false,
    "given [two arrays with same content] should [return false]"
  )

  t.equal(
    isEqual({ a: 1 })({ a: 1 }),
    false,
    "given [two objects with same content] should [return false]"
  )

  t.end()
})
