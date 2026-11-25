import test from "tape"

import { groupBy } from "./group-by.js"
import { read } from "../read/read.js"

type Item = { name: string; role: string }

const ITEMS: Item[] = [
  { name: "alice", role: "admin" },
  { name: "bob", role: "user" },
  { name: "carol", role: "admin" },
]

test("groupBy - uncurried", t => {
  t.deepEqual(
    groupBy(item => item.role, ITEMS),
    {
      admin: [
        { name: "alice", role: "admin" },
        { name: "carol", role: "admin" },
      ],
      user: [{ name: "bob", role: "user" }],
    },
    "given [key fn and array, uncurried] should [return record of groups]"
  )

  t.deepEqual(
    groupBy(item => item % 3, [1, 2, 3, 4, 5, 6]),
    {
      0: [3, 6],
      1: [1, 4],
      2: [2, 5],
    },
    "given [a number key] should [group under the number as a string]"
  )

  // To split by a boolean, `partition(read("active"))` is the intended
  // tool: it returns both groups as a pair, `[pass, fail]`
  t.deepEqual(
    groupBy(
      [read("active"), String],
      [
        { name: "alice", active: true },
        { name: "bob", active: false },
        { name: "carol", active: true },
      ]
    ),
    {
      true: [
        { name: "alice", active: true },
        { name: "carol", active: true },
      ],
      false: [{ name: "bob", active: false }],
    },
    "given [a boolean key turned into a string by a String step] should [group under true and false]"
  )

  t.deepEqual(
    groupBy(() => "all", [1, 2, 3]),
    { all: [1, 2, 3] },
    "given [constant key fn] should [put all items in one group]"
  )

  t.deepEqual(
    groupBy(() => "x", []),
    {},
    "given [empty array] should [return empty record]"
  )

  t.deepEqual(
    groupBy(
      [(item: Item) => item.role, (role: string) => role.toUpperCase()],
      ITEMS
    ),
    {
      ADMIN: [
        { name: "alice", role: "admin" },
        { name: "carol", role: "admin" },
      ],
      USER: [{ name: "bob", role: "user" }],
    },
    "given [a pipe array as fn] should [group by the composed key]"
  )

  {
    const readonlyItems: readonly Item[] = ITEMS

    t.deepEqual(
      Object.keys(groupBy(item => item.role, readonlyItems)),
      ["admin", "user"],
      "given [a readonly array] should [return the groups in first-seen order]"
    )
  }

  {
    const keyed = [
      { k: "constructor" },
      { k: "toString" },
      { k: "constructor" },
    ]
    const groups = groupBy(item => item.k, keyed)

    t.deepEqual(
      Object.keys(groups),
      ["constructor", "toString"],
      "given [keys that exist on Object.prototype] should [keep them as own keys]"
    )
    t.equal(
      groups["constructor"]?.length,
      2,
      "given [the key constructor twice] should [group both items]"
    )
  }

  {
    const keyed = [
      { k: "__proto__", v: 1 },
      { k: "__proto__", v: 2 },
    ]
    const groups = groupBy(item => item.k, keyed)

    t.deepEqual(
      Object.keys(groups),
      ["__proto__"],
      "given [the key __proto__] should [keep it as an own key]"
    )
    t.equal(
      Object.getPrototypeOf(groups),
      Object.prototype,
      "given [the key __proto__] should [leave the prototype alone]"
    )
    t.deepEqual(
      Object.getOwnPropertyDescriptor(groups, "__proto__")?.value,
      keyed,
      "given [the key __proto__ twice] should [group both items under it]"
    )
  }

  t.end()
})

test("groupBy - curried", t => {
  t.deepEqual(
    groupBy((item: Item) => item.role)(ITEMS),
    {
      admin: [
        { name: "alice", role: "admin" },
        { name: "carol", role: "admin" },
      ],
      user: [{ name: "bob", role: "user" }],
    },
    "given [key fn, curried] should [return record of groups]"
  )

  t.end()
})

test("groupBy - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      groupBy(42, ITEMS)
    },
    /expected 'fn' to be 'Function' or 'Array', got 'Number'/,
    "given [a number as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      groupBy([(item: Item) => item.role, 1], ITEMS)
    },
    /expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a number in a pipe array] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      groupBy([], ITEMS)
    },
    /expected 'fn' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe array] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      groupBy((item: Item) => item.role, "not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.end()
})
