import test from "tape"

import { write } from "./write.js"
import { pipe } from "../pipe/pipe.js"
import { read } from "../read/read.js"

test("write - uncurried", t => {
  t.deepEqual(
    write("name", "bob", { id: 1, name: "alice" }),
    { id: 1, name: "bob" },
    "given [an existing key] should [replace its value]"
  )

  t.deepEqual(
    write("name", "bob", { id: 1 }),
    { id: 1, name: "bob" },
    "given [a missing key] should [add it]"
  )

  t.deepEqual(
    write(["a", "b"], 2, { a: { b: 1, c: 3 } }),
    { a: { b: 2, c: 3 } },
    "given [a deep path] should [replace the nested value]"
  )

  t.deepEqual(
    write([1], "x", ["a", "b", "c"]),
    ["a", "x", "c"],
    "given [an index on an array] should [replace the item]"
  )

  t.deepEqual(
    write(["users", 0, "name"], "bob", { users: [{ id: 1, name: "alice" }] }),
    { users: [{ id: 1, name: "bob" }] },
    "given [a path through an array] should [replace the nested value]"
  )

  {
    const isAdmin = (): boolean => true
    const result = write("check", isAdmin, { id: 1 })

    t.equal(
      result.check,
      isAdmin,
      "given [a function as value] should [write it as it is, never call it]"
    )
  }

  t.end()
})

test("write - curried", t => {
  t.deepEqual(
    write("name", "bob")({ id: 1 }),
    { id: 1, name: "bob" },
    "given [a single key] should [add it]"
  )

  t.deepEqual(
    write(["a", "b"], 2)({ a: { b: 1 } }),
    { a: { b: 2 } },
    "given [a deep path] should [replace the nested value]"
  )

  t.equal(
    pipe(
      write(["user", "name"], "bob"),
      read(["user", "name"])
    )({ user: { name: "alice" } }),
    "bob",
    "given [write and read in a pipe] should [read the written value]"
  )

  t.end()
})

test("write - missing segments", t => {
  t.deepEqual(
    write(["a", "b", "c"], 1, {}),
    { a: { b: { c: 1 } } },
    "given [missing string segments] should [create plain objects]"
  )

  t.deepEqual(
    write(["tags", 0], "x", {}),
    { tags: ["x"] },
    "given [a missing segment before an index] should [create an array]"
  )

  t.deepEqual(
    write(["a", 1.5], "x", {}),
    { a: { "1.5": "x" } },
    "given [a missing segment before a non-integer number] should [create a plain object]"
  )

  t.deepEqual(
    write(["a", "b"], 1, { a: undefined }),
    { a: { b: 1 } },
    "given [an undefined value on the path] should [create a plain object]"
  )

  t.end()
})

test("write - copies", t => {
  {
    const input = { a: { b: 1 }, c: { d: 2 } }
    const result = write(["a", "b"], 3, input)

    t.equal(
      result.c,
      input.c,
      "given [a deep path] should [keep the reference of every other branch]"
    )

    t.notEqual(
      result.a,
      input.a,
      "given [a deep path] should [copy each object along the path]"
    )

    t.deepEqual(
      input,
      { a: { b: 1 }, c: { d: 2 } },
      "given [a deep path] should [not mutate the input]"
    )
  }

  {
    const input = [{ id: 1 }, { id: 2 }]
    const result = write([0, "id"], 3, input)

    t.equal(
      result[1],
      input[1],
      "given [a path through an array] should [keep the other items]"
    )

    t.deepEqual(
      input,
      [{ id: 1 }, { id: 2 }],
      "given [a path through an array] should [not mutate the input]"
    )
  }

  {
    const result = write(["__proto__", "polluted"], true, {})

    t.deepEqual(
      Object.keys(result),
      ["__proto__"],
      "given [a __proto__ segment] should [write an own key]"
    )

    t.equal(
      Object.getPrototypeOf(result),
      Object.prototype,
      "given [a __proto__ segment] should [keep the prototype]"
    )
  }

  {
    // A key the prototype has is an ordinary own key: read gets back what
    // write wrote, and the prototype stays Object.prototype
    const result = write("constructor", 2, {})

    t.equal(
      result.constructor,
      2,
      "given [the key constructor] should [read back the written value with a dot]"
    )

    t.equal(
      result["constructor"],
      2,
      "given [the key constructor] should [read back the written value with brackets]"
    )

    t.equal(
      read("constructor")(result),
      2,
      "given [the key constructor] should [read back the written value with read]"
    )

    t.equal(
      Object.getPrototypeOf(result),
      Object.prototype,
      "given [the key constructor] should [keep the prototype]"
    )
  }

  {
    const input = Object.create(null) as Record<string, unknown>
    input["a"] = 1

    t.deepEqual(
      { ...write("b", 2, input) },
      { a: 1, b: 2 },
      "given [an object with a null prototype] should [write into a copy]"
    )
  }

  t.end()
})

test("write - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      write(42, 1, {})
    },
    /@asd14\/m\/write: expected 'path' to be 'String' or 'Array', got 'Number'/,
    "given [a number as path] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      write([], 1, {})
    },
    /@asd14\/m\/write: expected 'path' to be 'NonEmpty', got 'Empty'/,
    "given [an empty path] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      write(["a", true], 1, {})
    },
    /@asd14\/m\/write: expected 'path\[1\]' to be 'String' or 'Number', got 'Boolean'/,
    "given [a boolean segment] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      write("a")
    },
    /@asd14\/m\/write: expected 'value' to be 'Any', got 'Missing'/,
    "given [no value] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      write("a", 1, "text")
    },
    /@asd14\/m\/write: expected 'input' to be 'Object' or 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    () => {
      write("a", 1, new Date())
    },
    /@asd14\/m\/write: expected 'input' to be 'Object' or 'Array', got 'Date'/,
    "given [a Date as input] should [throw TypeError]"
  )

  t.throws(
    () => {
      write(["a", "b"], 1, { a: 2 })
    },
    /@asd14\/m\/write: expected 'input.a' to be 'Object' or 'Array', got 'Number'/,
    "given [a number on the path] should [throw TypeError, not overwrite it]"
  )

  t.throws(
    () => {
      write(["list", 0, "at"], 1, { list: [new Date()] })
    },
    /@asd14\/m\/write: expected 'input.list\[0\]' to be 'Object' or 'Array', got 'Date'/,
    "given [a Date on the path] should [throw TypeError, not overwrite it]"
  )

  t.throws(
    () => {
      write(["a", "b"], 1, { a: null })
    },
    /@asd14\/m\/write: expected 'input.a' to be 'Object' or 'Array', got 'Null'/,
    "given [null on the path] should [throw TypeError, not overwrite it]"
  )

  t.end()
})
