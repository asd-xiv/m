import test from "tape"

import { evolve } from "./evolve.js"
import { inc } from "../inc/inc.js"

test("evolve - uncurried", t => {
  t.deepEqual(
    evolve({ count: inc }, { count: 1, id: 1 }),
    { count: 2, id: 1 },
    "given [a function and an object] should [apply the function to the key's value]"
  )

  {
    const user: Record<string, number> = { count: 1 }

    t.deepEqual(
      evolve({ missing: inc }, user),
      { count: 1 },
      "given [a patcher key the input lacks] should [skip it]"
    )
  }

  {
    const user: { name: string; id: number } = { name: "foo", id: 1 }

    t.deepEqual(
      evolve({ name: (name, source) => `${name} ${source.id}` }, user),
      { name: "foo 1", id: 1 },
      "given [a function using the second param] should [compute from the whole object]"
    )
  }

  {
    const user: { tags: string[] } = { tags: ["a"] }

    t.deepEqual(
      evolve({ tags: () => ["x"] }, user),
      { tags: ["x"] },
      "given [a function returning an array] should [set the array]"
    )
  }

  {
    const user: { tags: string[]; id: number } = { tags: ["a"], id: 1 }

    t.deepEqual(
      evolve({ tags: tags => tags.length }, user),
      { tags: 1, id: 1 },
      "given [a function returning another type] should [replace the value with it]"
    )
  }

  {
    const calls: unknown[][] = []
    const user = { count: 1 }

    evolve({ count: (...params: unknown[]) => calls.push(params) }, user)

    t.deepEqual(
      calls,
      [[1, { count: 1 }]],
      "given [a function] should [call it with the value and the source only]"
    )
  }

  {
    const user = { count: 1, name: "foo" }
    const result = evolve({ count: inc }, user)

    t.notEqual(result, user, "given [an object] should [return a new object]")
    t.deepEqual(
      user,
      { count: 1, name: "foo" },
      "given [an object] should [not mutate it]"
    )
  }

  {
    const user = JSON.parse('{"__proto__":1,"count":1}') as Record<
      string,
      number
    >
    const result = evolve({ count: inc }, user)

    t.deepEqual(
      Object.keys(result).sort(),
      ["__proto__", "count"],
      "given [an own '__proto__' key] should [keep it as an own key]"
    )
    t.equal(
      Object.getPrototypeOf(result),
      Object.prototype,
      "given [an own '__proto__' key] should [leave the prototype alone]"
    )
  }

  t.end()
})

test("evolve - curried", t => {
  t.deepEqual(
    evolve({ test: inc })({ test: 2 }),
    { test: 3 },
    "given [function transformer, curried] should [apply function to field value]"
  )

  t.deepEqual(
    evolve({ test: [inc, inc] })({ test: 2 }),
    { test: 4 },
    "given [array of piped functions, curried] should [apply pipe to field value]"
  )

  t.end()
})

test("evolve - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => evolve(42),
    /expected 'patcher' to be 'Object', got 'Number'/,
    "given [non-object patcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => evolve({ a: inc }, "not-an-object"),
    /expected 'input' to be 'Object', got 'String'/,
    "given [non-object input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- intentionally testing wrong input type
      evolve({ a: inc })("not-an-object")
    },
    /expected 'input' to be 'Object', got 'String'/,
    "given [non-object input, curried] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => evolve({ name: "bar" }, { name: "foo" }),
    /@asd14\/m\/evolve: expected 'patcher.name' to be 'Function' or 'Array', got 'String'/,
    "given [a plain value in the patcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => evolve({ tags: ["x"] }, { tags: ["a"] }),
    /expected 'patcher.tags\[0\]' to be 'Function', got 'String'/,
    "given [an array of values in the patcher] should [read it as a pipe and throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => evolve({ tags: [] }, { tags: ["a"] }),
    /expected 'patcher.tags' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe array] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => evolve({ count: [inc, 1] }, { count: 1 }),
    /expected 'patcher.count\[1\]' to be 'Function', got 'Number'/,
    "given [a pipe array with a non-function] should [name the path in the error]"
  )

  t.end()
})
