import test from "tape"

import { update } from "./update.ts"

test("update - uncurried", t => {
  t.deepEqual(
    update({ test: "changed" }, { test: "Lorem Ipsum" }),
    { test: "changed" },
    "given [literal replacement for existing property] should [return object with changed value]"
  )

  {
    const item: { id: number; note?: string } = { id: 1 }

    t.deepEqual(
      update({ note: "added" }, item),
      { id: 1, note: "added" },
      "given [a missing optional key] should [add the property]"
    )
  }

  t.deepEqual(
    update(
      {
        test: (input: string, item: { foo: string; test: string }) =>
          `${input} ${item.foo}`,
      },
      {
        foo: "bar",
        test: "Lorem Ipsum",
      }
    ),
    {
      foo: "bar",
      test: "Lorem Ipsum bar",
    },
    "given [transformer accessing other fields via second argument] should [compute value from full object]"
  )

  {
    const item: { tags: string[] } = { tags: ["a"] }

    t.deepEqual(
      update({ tags: () => ["x"] }, item),
      { tags: ["x"] },
      "given [a function returning an array] should [set the array]"
    )
  }

  {
    const calls: unknown[][] = []
    const item = { count: 1 }

    update({ count: (...params: unknown[]) => calls.push(params) }, item)

    t.deepEqual(
      calls,
      [[1, { count: 1 }]],
      "given [a function] should [call it with the value and the source only]"
    )
  }

  {
    const item = { count: 1, name: "foo" }
    const result = update({ count: 2 }, item)

    t.notEqual(result, item, "given [an object] should [return a new object]")
    t.deepEqual(
      item,
      { count: 1, name: "foo" },
      "given [an object] should [not mutate it]"
    )
  }

  {
    const item = JSON.parse('{"__proto__":{"polluted":1},"a":0}') as {
      a: number
    }
    const result = update({ a: 1 }, item)

    t.deepEqual(
      Object.keys(result).sort(),
      ["__proto__", "a"],
      "given [an own '__proto__' key on the input] should [keep it as an own key]"
    )
    t.equal(
      Reflect.get(result, "polluted"),
      undefined,
      "given [an own '__proto__' key on the input] should [leave the prototype alone]"
    )
  }

  {
    const patcher = JSON.parse('{"__proto__":{"polluted":1}}') as {
      a?: number
    }
    const result = update(patcher, { a: 1 })

    t.deepEqual(
      Object.keys(result).sort(),
      ["__proto__", "a"],
      "given [an own '__proto__' key on the patcher] should [write it as an own key]"
    )
    t.equal(
      Reflect.get(result, "polluted"),
      undefined,
      "given [an own '__proto__' key on the patcher] should [leave the prototype alone]"
    )
  }

  t.deepEqual(
    update({ toString: value => typeof value }, {}),
    { toString: "undefined" },
    "given [a key the input lacks but its prototype has] should [pass undefined to the patch function]"
  )

  t.end()
})

test("update - curried", t => {
  t.deepEqual(
    update({ test: (x: number) => x + 1 })({ test: 2 }),
    { test: 3 },
    "given [function transformer, curried] should [apply function to field value]"
  )

  t.deepEqual(
    update({ count: [(x: number) => x + 1, (x: number) => x * 2] })({
      count: 2,
    }),
    { count: 6 },
    "given [array of pipe functions as transformer] should [compose and apply to field value]"
  )

  t.end()
})

test("update - invalid input", t => {
  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => update(42, { test: 1 }),
    /@asd14\/m\/update: expected 'patcher' to be 'Object', got 'Number'/,
    "given [a number as patcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => update({ test: 1 }, "lorem"),
    /expected 'input' to be 'Object', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => update({ test: 1 })(null),
    /expected 'input' to be 'Object', got 'Null'/,
    "given [null as input, curried] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => update({ tags: ["x"] }, { tags: ["a"] }),
    /expected 'patcher.tags\[0\]' to be 'Function', got 'String'/,
    "given [an array of values in the patcher] should [read it as a pipe and throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => update({ tags: [] }, { tags: ["a"] }),
    /expected 'patcher.tags' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe array] should [throw TypeError]"
  )

  t.end()
})
