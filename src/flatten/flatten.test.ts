import test from "tape"

import { flatten } from "./flatten.js"

test("flatten - uncurried", t => {
  t.deepEqual(
    flatten([]),
    [],
    "given [empty array] should [return empty array]"
  )

  t.deepEqual(
    flatten([[[]]]),
    [],
    "given [deeply nested empty arrays] should [return empty array]"
  )

  t.deepEqual(
    flatten([[[1]]]),
    [1],
    "given [deeply nested single value] should [return flat array]"
  )

  t.deepEqual(
    flatten([1, [2], [3, [4]]]),
    [1, 2, 3, 4],
    "given [nested array] should [return flat array]"
  )

  t.deepEqual(
    flatten({
      test: {
        inside: "one",
        another: "two",
        lvl: {
          three: "3",
        },
      },
      lorem: "ipsum",
      an_array: [1, 2],
    }),
    {
      "test.inside": "one",
      "test.another": "two",
      "test.lvl.three": "3",
      "lorem": "ipsum",
      "an_array": [1, 2],
    },
    "given [nested object] should [return flat object with dot separator]"
  )

  t.deepEqual(
    flatten({ level: 1 }, [1, [2, [3]]]),
    [1, 2, [3]],
    "given [level 1 and nested array] should [flatten one level]"
  )

  t.deepEqual(
    flatten({ separator: "__" }, { a: { b: 1 } }),
    { a__b: 1 },
    "given [custom separator and nested object] should [use separator]"
  )

  t.deepEqual(
    flatten({ separator: "x" }),
    { separator: "x" },
    "given [one object with an option key] should [flatten it as input]"
  )

  t.deepEqual(
    flatten({ level: { max: 1 } }),
    { "level.max": 1 },
    "given [one nested object with an option key] should [flatten it as input]"
  )

  t.deepEqual(
    flatten({ a: new Date(0), b: { c: 1 } }),
    { "a": new Date(0), "b.c": 1 },
    "given [a Date value] should [keep it as a leaf]"
  )

  t.deepEqual(
    flatten({ a: {}, b: 1 }),
    { a: {}, b: 1 },
    "given [an empty object value] should [keep it as a leaf]"
  )

  t.deepEqual(
    flatten({
      a: {
        b: Object.create(null, { c: { value: 1, enumerable: true } }) as object,
      },
    }),
    { "a.b.c": 1 },
    "given [an object with a null prototype] should [flatten it]"
  )

  {
    const loop: Record<string, unknown> = { a: 1 }

    loop["self"] = loop

    t.deepEqual(
      flatten({ loop }),
      { "loop.a": 1, "loop.self": loop },
      "given [an object that contains itself] should [keep the cycle as a leaf]"
    )
  }

  {
    const big = Array.from({ length: 200_000 }, (_, i) => i)

    t.equal(
      flatten([big, [big]]).length,
      400_000,
      "given [a large nested array] should [not overflow the stack]"
    )
  }

  {
    const result = flatten(
      JSON.parse('{"a":{"__proto__":1}}') as Record<string, unknown>
    )

    t.deepEqual(
      Object.getOwnPropertyNames(result),
      ["a.__proto__"],
      "given [a __proto__ key] should [keep it as an own key]"
    )

    t.deepEqual(
      Object.getOwnPropertyNames(
        flatten(JSON.parse('{"__proto__":1,"b":2}') as Record<string, unknown>)
      ),
      ["__proto__", "b"],
      "given [a top level __proto__ key] should [keep it as an own key]"
    )
  }

  t.deepEqual(
    flatten({ level: 0 }, [1, [2]]),
    [1, [2]],
    "given [level 0] should [flatten nothing]"
  )

  t.end()
})

test("flatten - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => flatten(42),
    /expected 'input' to be 'Array' or 'Object', got 'Number'/,
    "given [a number] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => flatten("foo"),
    /expected 'input' to be 'Array' or 'Object', got 'String'/,
    "given [a string] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => flatten(null),
    /expected 'input' to be 'Array' or 'Object', got 'Null'/,
    "given [null] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong options type
    () => flatten("level", [1, [2]]),
    /expected 'options' to be 'Object', got 'String'/,
    "given [a string as options] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => flatten({ level: 1 }, 42),
    /expected 'input' to be 'Array' or 'Object', got 'Number'/,
    "given [options and a number] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => flatten(new Date(0)),
    /expected 'input' to be 'Array' or 'Object', got 'Date'/,
    "given [a Date] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong level type
    () => flatten({ level: "1" }, [1, [2]]),
    /expected 'level' to be 'Number', got 'String'/,
    "given [a string level] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong separator type
    () => flatten({ separator: 1 }, { a: { b: 1 } }),
    /expected 'separator' to be 'String', got 'Number'/,
    "given [a number separator] should [throw TypeError]"
  )

  t.end()
})
