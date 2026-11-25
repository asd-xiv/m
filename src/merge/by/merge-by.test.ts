import test from "tape"

import { mergeBy } from "./merge-by.js"
import { isSomething } from "../../is/is.js"

const definedWins = (left: unknown, right: unknown) =>
  isSomething(right) ? right : left

test("mergeBy - uncurried", t => {
  t.deepEqual(
    mergeBy(
      definedWins,
      { port: 3000, host: "localhost", debug: false },
      { port: undefined, host: "0.0.0.0", debug: undefined }
    ),
    { port: 3000, host: "0.0.0.0", debug: false },
    "given [definedWins strategy, uncurried] should [keep defined values from either side]"
  )

  t.deepEqual(
    mergeBy(
      (left: unknown, right: unknown) =>
        Math.max(left as number, right as number),
      { a: 1, b: 10 },
      { a: 5, b: 3 }
    ),
    { a: 5, b: 10 },
    "given [max strategy] should [take the larger value per key]"
  )

  t.deepEqual(
    mergeBy(
      (_left: unknown, _right: unknown, key: string) =>
        key === "secret" ? "***" : _right,
      { name: "app", secret: "abc" },
      { name: "app2", secret: "xyz" }
    ),
    { name: "app2", secret: "***" },
    "given [key-aware strategy] should [use key to decide resolution]"
  )

  t.deepEqual(
    mergeBy(
      (left: unknown, right: unknown) =>
        Math.max((left ?? right) as number, right as number),
      { a: 1 },
      { a: 5, b: 3 }
    ),
    { a: 5, b: 3 },
    "given [a key only in b] should [call the strategy with left undefined]"
  )

  t.deepEqual(
    mergeBy(definedWins, { a: 1, b: 2 }, { b: 3 }),
    { a: 1, b: 3 },
    "given [a key only in a] should [keep it without calling the strategy]"
  )

  t.deepEqual(
    mergeBy(definedWins, {}, { toString: "own" }),
    { toString: "own" },
    "given [a key that exists on Object.prototype] should [pass left as undefined]"
  )

  {
    const polluted = JSON.parse(
      '{ "__proto__": { "polluted": true } }'
    ) as Record<string, unknown>
    const merged = mergeBy(definedWins, { a: 1 }, polluted)

    t.deepEqual(
      Object.keys(merged),
      ["a", "__proto__"],
      "given [an own __proto__ key in b] should [keep it as an own key]"
    )
    t.equal(
      Object.getPrototypeOf(merged),
      Object.prototype,
      "given [an own __proto__ key in b] should [leave the prototype alone]"
    )
  }

  t.end()
})

test("mergeBy - curried", t => {
  t.deepEqual(
    mergeBy(definedWins, { port: 3000, debug: false })({
      port: undefined,
      host: "0.0.0.0",
    }),
    { port: 3000, debug: false, host: "0.0.0.0" },
    "given [definedWins strategy, curried with left] should [merge right when called]"
  )

  t.end()
})

test("mergeBy - invalid input", t => {
  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => mergeBy(definedWins),
    /expected 'a' to be 'Object', got 'Undefined'/,
    "given [the removed (strategy) form] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => mergeBy(42, { a: 1 }, { b: 2 }),
    /expected 'strategy' to be 'Function', got 'Number'/,
    "given [a number as strategy] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => mergeBy((left: unknown) => left, "lorem", { b: 2 }),
    /expected 'a' to be 'Object', got 'String'/,
    "given [a string as a] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => mergeBy((left: unknown) => left, { a: 1 }, null),
    /expected 'b' to be 'Object', got 'Null'/,
    "given [null as b] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => mergeBy(definedWins, { a: 1 })(new Date()),
    /expected 'b' to be 'Object', got 'Date'/,
    "given [a Date as curried b] should [throw TypeError, a Date is not plain]"
  )

  t.end()
})
