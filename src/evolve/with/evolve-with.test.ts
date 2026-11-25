import test from "tape"

import { evolveWith } from "./evolve-with.js"
import { inc } from "../../inc/inc.js"
import { isSomething } from "../../is/is.js"

test("evolveWith - uncurried", t => {
  t.deepEqual(
    evolveWith({ id: 2 }, { count: [inc], other: inc }, [
      { id: 1, count: 0, other: 0 },
      { id: 2, count: 1, other: 0 },
    ]),
    [
      { id: 1, count: 0, other: 0 },
      { id: 2, count: 2, other: 1 },
    ],
    "given [match, transformations, and array] should [evolve only matching items]"
  )

  t.deepEqual(
    evolveWith({ id: 999 }, { count: inc }, [
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
    const items: { name?: string; count: number }[] = [
      { count: 0 },
      { name: "foo", count: 0 },
    ]

    t.deepEqual(
      evolveWith({ "!name": isSomething }, { count: inc }, items),
      [{ count: 1 }, { name: "foo", count: 0 }],
      "given [a negated key] should [evolve the items that do not match it]"
    )
  }

  {
    const items = [{ id: Number.NaN, count: 0 }]

    t.deepEqual(
      evolveWith({ id: Number.NaN }, { count: inc }, items),
      [{ id: Number.NaN, count: 1 }],
      "given [NaN as a match value] should [match NaN, compared with SameValueZero]"
    )
  }

  {
    const items = [
      { id: 1, count: 0 },
      { id: 2, count: 0 },
    ]

    t.deepEqual(
      evolveWith({ id: (id: number) => id === 1 }, { count: inc }, items),
      [
        { id: 1, count: 1 },
        { id: 2, count: 0 },
      ],
      "given [a predicate] should [evolve the items it returns true for]"
    )
  }

  {
    const items: { tags: string[]; count: number }[] = [
      { tags: ["a"], count: 0 },
      { tags: ["b"], count: 0 },
    ]

    t.deepEqual(
      evolveWith({ tags: tags => tags[0] === "a" }, { count: inc }, items),
      [
        { tags: ["a"], count: 1 },
        { tags: ["b"], count: 0 },
      ],
      "given [a predicate on an array field] should [match the array]"
    )
  }

  {
    const items = [{ id: 1, count: 0 }]

    t.deepEqual(
      evolveWith({ id: 1 }, { count: String }, items),
      [{ id: 1, count: "0" }],
      "given [a function changing the type] should [return the new type]"
    )
  }

  t.end()
})

test("evolveWith - curried", t => {
  t.deepEqual(
    evolveWith(
      { id: 2 },
      { count: inc }
    )([
      { id: 1, count: 0 },
      { id: 2, count: 1 },
    ]),
    [
      { id: 1, count: 0 },
      { id: 2, count: 2 },
    ],
    "given [match and transformations, curried] should [return function that evolves matching items]"
  )

  t.end()
})

test("evolveWith - invalid input", t => {
  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => evolveWith("42", { count: inc }, []),
    /@asd14\/m\/evolveWith: expected 'match' to be 'Object', got 'String'/,
    "given [non-object match] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => evolveWith({ id: 1 }, 42, []),
    /expected 'patcher' to be 'Object', got 'Number'/,
    "given [non-object patcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => evolveWith({ id: 1 }, { count: inc }, "not-an-array"),
    /@asd14\/m\/evolveWith: expected 'input' to be 'Array', got 'String'/,
    "given [non-array input] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => evolveWith({ id: 1 }, { count: inc }, [null]),
    /@asd14\/m\/evolveWith: expected 'input\[\*\]' to be 'Object', got 'Null'/,
    "given [a null item] should [name the item in the error]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => evolveWith({ id: 1 }, { count: 1 }, []),
    /expected 'patcher.count' to be 'Function' or 'Array', got 'Number'/,
    "given [a plain value in the patcher] should [throw TypeError]"
  )

  t.deepEqual(
    // @ts-expect-error -- a predicate must return a boolean
    evolveWith({ id: (id: number) => id }, { count: inc }, [
      { id: 1, count: 0 },
    ]),
    [{ id: 1, count: 0 }],
    "given [a predicate returning a truthy value] should [not match, only true does]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => evolveWith({ tags: ["a"] }, { count: inc }, []),
    /expected 'match.tags\[0\]' to be 'Function', got 'String'/,
    "given [an array in a match value] should [read it as a pipe and throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => evolveWith({ tags: [] }, { count: inc }, []),
    /expected 'match.tags' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe array in match] should [throw TypeError]"
  )

  t.end()
})
