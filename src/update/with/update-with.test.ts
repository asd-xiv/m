import test from "tape"

import { updateWith } from "./update-with.js"
import { inc } from "../../inc/inc.js"
import { isSomething } from "../../is/is.js"

test("updateWith - uncurried", t => {
  t.deepEqual(
    updateWith({ id: 2 }, { count: inc, other: 2 }, [
      { id: 1, count: 0, other: 0 },
      { id: 2, count: 1, other: 0 },
    ]),
    [
      { id: 1, count: 0, other: 0 },
      { id: 2, count: 2, other: 2 },
    ],
    "given [match, transformations, and array, uncurried] should [update only matching items]"
  )

  const items = [
    { name: "foo", active: false },
    { name: undefined, active: false },
    { name: "bar", active: false },
  ]

  t.deepEqual(
    updateWith({ name: isSomething }, { active: true }, items),
    [
      { name: "foo", active: true },
      { name: undefined, active: false },
      { name: "bar", active: true },
    ],
    "given [a predicate in match] should [update only items where predicate matches]"
  )

  t.deepEqual(
    updateWith({ id: 999 }, { count: inc }, [
      { id: 1, count: 0 },
      { id: 2, count: 0 },
    ]),
    [
      { id: 1, count: 0 },
      { id: 2, count: 0 },
    ],
    "given [match matching no items] should [return array unchanged]"
  )

  {
    const items: { id: number; tags: string[] }[] = [
      { id: 1, tags: ["a"] },
      { id: 2, tags: ["b"] },
    ]

    t.deepEqual(
      updateWith({ id: 1 }, { tags: () => ["x"] }, items),
      [
        { id: 1, tags: ["x"] },
        { id: 2, tags: ["b"] },
      ],
      "given [a function returning an array] should [set the array]"
    )

    t.deepEqual(
      updateWith({ tags: tags => tags[0] === "b" }, { id: 3 }, items),
      [
        { id: 1, tags: ["a"] },
        { id: 3, tags: ["b"] },
      ],
      "given [a predicate on an array field] should [match the array]"
    )
  }

  {
    const items: { name?: string; active: boolean }[] = [
      { active: false },
      { name: "foo", active: false },
    ]

    t.deepEqual(
      updateWith({ "!name": isSomething }, { active: true }, items),
      [{ active: true }, { name: "foo", active: false }],
      "given [a negated key] should [update the items that do not match it]"
    )
  }

  {
    const items = [{ id: Number.NaN, active: false }]

    t.deepEqual(
      updateWith({ id: Number.NaN }, { active: true }, items),
      [{ id: Number.NaN, active: true }],
      "given [NaN as a match value] should [match NaN, compared with SameValueZero]"
    )
  }

  {
    const calls: unknown[][] = []

    updateWith(
      { id: 1 },
      { id: (...params: unknown[]) => calls.push(params) },
      [{ id: 1 }]
    )

    t.deepEqual(
      calls,
      [[1, { id: 1 }]],
      "given [a function] should [call it with the value and the item only]"
    )
  }

  {
    const items: { id: number; tags: string[] }[] = [
      { id: 1, tags: ["a"] },
      { id: 2, tags: ["b"] },
    ]

    t.deepEqual(
      updateWith({ id: 1 }, { tags: () => ["x"] }, items),
      [
        { id: 1, tags: ["x"] },
        { id: 2, tags: ["b"] },
      ],
      "given [a function returning an array] should [set the array]"
    )

    t.deepEqual(
      updateWith({ tags: tags => tags[0] === "b" }, { id: 3 }, items),
      [
        { id: 1, tags: ["a"] },
        { id: 3, tags: ["b"] },
      ],
      "given [a predicate on an array field] should [match the array]"
    )
  }

  {
    const items: { name?: string; active: boolean }[] = [
      { active: false },
      { name: "foo", active: false },
    ]

    t.deepEqual(
      updateWith({ "!name": isSomething }, { active: true }, items),
      [{ active: true }, { name: "foo", active: false }],
      "given [a negated key] should [update the items that do not match it]"
    )
  }

  {
    const items = [{ id: Number.NaN, active: false }]

    t.deepEqual(
      updateWith({ id: Number.NaN }, { active: true }, items),
      [{ id: Number.NaN, active: true }],
      "given [NaN as a match value] should [match NaN, compared with SameValueZero]"
    )
  }

  {
    const calls: unknown[][] = []

    updateWith(
      { id: 1 },
      { id: (...params: unknown[]) => calls.push(params) },
      [{ id: 1 }]
    )

    t.deepEqual(
      calls,
      [[1, { id: 1 }]],
      "given [a function] should [call it with the value and the item only]"
    )
  }

  t.end()
})

test("updateWith - curried", t => {
  t.deepEqual(
    updateWith(
      { id: 2 },
      { count: inc, other: 2 }
    )([
      { id: 1, count: 0, other: 0 },
      { id: 2, count: 1, other: 0 },
    ]),
    [
      { id: 1, count: 0, other: 0 },
      { id: 2, count: 2, other: 2 },
    ],
    "given [match and transformations, curried] should [return function that updates matching items]"
  )

  t.end()
})

test("updateWith - invalid input", t => {
  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => updateWith(42, { count: 1 }, [{ id: 1 }]),
    /@asd14\/m\/updateWith: expected 'match' to be 'Object', got 'Number'/,
    "given [a number as filter] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => updateWith({ id: 1 }, "lorem", [{ id: 1 }]),
    /expected 'patcher' to be 'Object', got 'String'/,
    "given [a string as patcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => updateWith({ id: 1 }, { count: 1 }, "lorem"),
    /@asd14\/m\/updateWith: expected 'input' to be 'Array', got 'String'/,
    "given [a string as input] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => updateWith({ id: 1 }, { count: 1 }, [{ id: 1 }, null]),
    /@asd14\/m\/updateWith: expected 'input\[\*\]' to be 'Object', got 'Null'/,
    "given [a null item] should [name the item in the error]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => updateWith({ tags: ["a"] }, { count: 1 }, []),
    /expected 'match.tags\[0\]' to be 'Function', got 'String'/,
    "given [an array in a match value] should [read it as a pipe and throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => updateWith({ id: 1 }, { tags: ["x"] }, []),
    /expected 'patcher.tags\[0\]' to be 'Function', got 'String'/,
    "given [an array in a patcher value] should [read it as a pipe and throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => updateWith({ id: 1 }, { tags: [] }, []),
    /expected 'patcher.tags' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe array in the patcher] should [throw TypeError]"
  )

  t.deepEqual(
    // @ts-expect-error -- a predicate must return a boolean
    updateWith({ id: (id: number) => id }, { count: 1 }, [{ id: 1, count: 0 }]),
    [{ id: 1, count: 0 }],
    "given [a predicate returning a truthy value] should [not match, only true does]"
  )

  t.end()
})
