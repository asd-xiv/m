import test from "tape"

import { evolveDeepBy } from "./evolve-deep-by.js"

const SENSITIVE = ["password", "token", "secret", "credentials"]
const redact = evolveDeepBy((key, value) =>
  SENSITIVE.includes(key) ? "[redacted]" : value
)

test("evolveDeepBy - uncurried", t => {
  t.deepEqual(
    evolveDeepBy((key, value) => (key === "x" ? 0 : value), { x: 99, y: 1 }),
    { x: 0, y: 1 },
    "given [flat object] should [transform matching keys]"
  )

  t.deepEqual(
    evolveDeepBy((_key, value) => value, { a: 1, b: "two" }),
    { a: 1, b: "two" },
    "given [identity fn] should [return structurally equal object]"
  )

  {
    const input = { a: 1, b: { c: 2 } }
    const original = { a: 1, b: { c: 2 } }

    evolveDeepBy(
      (_key, value) => (typeof value === "number" ? 99 : value),
      input
    )

    t.deepEqual(
      input,
      original,
      "given [any input] should [not mutate the original object]"
    )
  }

  {
    const input = { a: 1, b: 2 }

    evolveDeepBy((_key, value, parents) => {
      t.deepEqual(
        parents,
        [],
        "given [flat object] should [provide empty parents array for top-level keys]"
      )

      return value
    }, input)
  }

  {
    const input = { a: 1, b: { c: 2, d: { e: 2 } } }
    const iteratedParents: string[][] = []

    evolveDeepBy((_key, value, parents) => {
      iteratedParents.push(parents)
      return value
    }, input)

    t.deepEqual(
      iteratedParents,
      [[], ["b"], ["b", "d"]],
      "given [nested object] should [pass correct parent chain at each level]"
    )
  }

  const input: Record<string, unknown> = { a: 1 }
  input["self"] = input

  const result = evolveDeepBy((_key, value) => value, input)

  t.equal(
    result["a"],
    1,
    "given [circular reference] should [process non-circular keys normally]"
  )
  t.equal(
    result["self"],
    input,
    "given [circular reference] should [leave circular ref intact]"
  )

  t.end()
})

test("evolveDeepBy - curried", t => {
  t.deepEqual(
    redact({ password: "top-secret", name: "Bob" }),
    { password: "[redacted]", name: "Bob" },
    "given [curried fn and object with sensitive key] should [redact matching key]"
  )

  t.deepEqual(
    redact({ user: { name: "Alice", password: "s3cr3t" }, token: "abc" }),
    { user: { name: "Alice", password: "[redacted]" }, token: "[redacted]" },
    "given [nested object with sensitive keys] should [redact at all levels]"
  )

  t.deepEqual(
    redact({
      db: { host: "localhost", secret: "hunter2" },
      meta: { version: 1 },
    }),
    {
      db: { host: "localhost", secret: "[redacted]" },
      meta: { version: 1 },
    },
    "given [deeply nested sensitive key] should [redact only matching keys]"
  )

  t.deepEqual(
    redact({ credentials: { user: "alice", password: "s3cr3t" } }),
    { credentials: { user: "alice", password: "[redacted]" } },
    "given [sensitive key holding a nested object] should [recurse into it, not replace it]"
  )

  {
    const db = { host: "localhost", secret: "hunter2" }
    const result = redact({ primary: db, replica: db })

    t.deepEqual(
      result,
      {
        primary: { host: "localhost", secret: "[redacted]" },
        replica: { host: "localhost", secret: "[redacted]" },
      },
      "given [one object under two keys] should [redact both]"
    )

    t.notEqual(
      result["replica"],
      db,
      "given [one object under two keys] should [return a new object for each]"
    )
  }

  {
    const seen: string[] = []
    const date = new Date(0)

    const result = evolveDeepBy(
      (key, value) => {
        seen.push(key)

        return value
      },
      { when: date, nested: { a: 1 } }
    )

    t.deepEqual(
      seen,
      ["when", "a"],
      "given [a Date value] should [call fn on it as a leaf, a Date is not plain]"
    )
    t.equal(
      result["when"],
      date,
      "given [a Date value] should [keep the same Date]"
    )
  }

  {
    const input = JSON.parse('{"__proto__":{"polluted":1},"a":1}') as Record<
      string,
      unknown
    >
    const result = evolveDeepBy((_key, value) => value, input)

    t.deepEqual(
      Object.keys(result).sort(),
      ["__proto__", "a"],
      "given [an own '__proto__' key] should [keep it as an own key]"
    )
    t.equal(
      Reflect.get(result, "polluted"),
      undefined,
      "given [an own '__proto__' key] should [leave the prototype alone]"
    )
  }

  t.end()
})

test("evolveDeepBy - invalid input", t => {
  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => evolveDeepBy("not-a-function", { a: 1 }),
    /expected 'fn' to be 'Function', got 'String'/,
    "given [a string as fn] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => evolveDeepBy(_key => _key, "not-an-object"),
    /expected 'input' to be 'Object'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => evolveDeepBy(_key => _key, null),
    /expected 'input' to be 'Object'/,
    "given [null as input] should [throw TypeError]"
  )

  t.end()
})
