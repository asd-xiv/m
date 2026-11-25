import test from "tape"

import { curry } from "./curry.js"

test("curry - uncurried", t => {
  t.equal(
    curry(() => 42)(),
    42,
    "given [a 0-ary function] should [return the result directly]"
  )

  t.equal(
    curry((x: number) => x * 2)(5),
    10,
    "given [a 1-ary function] should [return the result directly]"
  )

  t.equal(
    curry((a: number, b: number) => a + b)(2)(3),
    5,
    "given [a 2-ary sum function] should [return the sum when called with one arg at a time]"
  )

  t.equal(
    curry((a: number, b: number, c: number) => a + b + c)(1)(2)(3),
    6,
    "given [a 3-ary sum function] should [return the sum when all args are provided one at a time]"
  )

  {
    const fnToCurry = (a: number, b: number, c: number, d: number) =>
      a + b + c + d

    t.equal(
      curry(fnToCurry)(1)(2)(3)(4),
      10,
      "given [a 4-ary function] should [return the sum when all args are provided one at a time]"
    )
  }

  {
    const fnToCurry = (a: unknown, b: unknown) => [a, b]

    t.deepEqual(
      // @ts-expect-error -- testing zero-arg call at runtime boundary
      curry(fnToCurry)()(undefined),
      [undefined, undefined],
      "given [a 2-ary function called with no arguments] should [treat each empty call as passing undefined]"
    )
  }

  {
    const fnToCurry = (a: unknown, b: unknown, c: unknown) => [a, b, c]

    t.deepEqual(
      // @ts-expect-error -- testing zero-arg call at runtime boundary
      curry(fnToCurry)(1)()(undefined),
      [1, undefined, undefined],
      "given [a 3-ary function with a middle empty call] should [treat empty call as passing undefined]"
    )
  }

  t.end()
})

test("curry - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      curry(42)
    },
    /expected 'fn' to be 'Function', got 'Number'/,
    "given [a number] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      curry(null)
    },
    /expected 'fn' to be 'Function', got 'Null'/,
    "given [null] should [throw TypeError]"
  )

  t.end()
})
