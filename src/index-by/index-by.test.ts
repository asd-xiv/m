import test from "tape"

import { indexBy } from "./index-by.js"

type Item = { id: number; name: string }

const ITEMS: Item[] = [
  { id: 1, name: "alice" },
  { id: 2, name: "bob" },
]

test("indexBy - uncurried", t => {
  t.deepEqual(
    indexBy(item => item.id, ITEMS),
    {
      1: { id: 1, name: "alice" },
      2: { id: 2, name: "bob" },
    },
    "given [key fn and array, uncurried] should [return record of items]"
  )

  t.deepEqual(
    indexBy(() => "all", [1, 2, 3]),
    { all: 3 },
    "given [a duplicate key] should [keep the last item]"
  )

  t.deepEqual(
    indexBy(() => "x", []),
    {},
    "given [empty array] should [return empty record]"
  )

  t.deepEqual(
    indexBy([(item: Item) => item.id > 1, String], ITEMS),
    {
      false: { id: 1, name: "alice" },
      true: { id: 2, name: "bob" },
    },
    "given [a boolean key turned into a string by a String step] should [index under true and false]"
  )

  t.deepEqual(
    indexBy(
      [(item: Item) => item.name, (name: string) => name.toUpperCase()],
      ITEMS
    ),
    {
      ALICE: { id: 1, name: "alice" },
      BOB: { id: 2, name: "bob" },
    },
    "given [a pipe array as fn] should [index by the composed key]"
  )

  {
    const readonlyItems: readonly Item[] = ITEMS

    t.deepEqual(
      Object.keys(indexBy(item => item.name, readonlyItems)),
      ["alice", "bob"],
      "given [a readonly array] should [return the keys in first-seen order]"
    )
  }

  {
    const keyed = [{ k: "constructor" }, { k: "toString" }]
    const indexed = indexBy(item => item.k, keyed)

    t.deepEqual(
      Object.keys(indexed),
      ["constructor", "toString"],
      "given [keys that exist on Object.prototype] should [keep them as own keys]"
    )
  }

  {
    const keyed = [
      { k: "__proto__", v: 1 },
      { k: "__proto__", v: 2 },
    ]
    const indexed = indexBy(item => item.k, keyed)

    t.deepEqual(
      Object.keys(indexed),
      ["__proto__"],
      "given [the key __proto__] should [keep it as an own key]"
    )
    t.equal(
      Object.getPrototypeOf(indexed),
      Object.prototype,
      "given [the key __proto__] should [leave the prototype alone]"
    )
    t.deepEqual(
      Object.getOwnPropertyDescriptor(indexed, "__proto__")?.value,
      { k: "__proto__", v: 2 },
      "given [the key __proto__ twice] should [keep the last item]"
    )
  }

  t.end()
})

test("indexBy - curried", t => {
  t.deepEqual(
    indexBy((item: Item) => item.id)(ITEMS),
    {
      1: { id: 1, name: "alice" },
      2: { id: 2, name: "bob" },
    },
    "given [key fn, curried] should [return record of items]"
  )

  t.end()
})

test("indexBy - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      indexBy(42, ITEMS)
    },
    /expected 'fn' to be 'Function' or 'Array', got 'Number'/,
    "given [a number as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      indexBy([(item: Item) => item.id, 1], ITEMS)
    },
    /expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a number in a pipe array] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      indexBy([], ITEMS)
    },
    /expected 'fn' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe array] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      indexBy((item: Item) => item.id, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.end()
})
