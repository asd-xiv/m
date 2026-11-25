import test from "tape"

import { isMatch } from "./is-match.js"
import { isSomething } from "../is/is.js"

test("isMatch - uncurried", t => {
  t.equal(
    isMatch(
      {
        id: 2,
        parentId: null,
      },
      {
        id: 2,
        parentId: null,
        name: "John",
      }
    ),
    true,
    "given [a matcher with values present in the input] should [return true]"
  )

  t.equal(
    isMatch(
      {
        name: "John",
        parentId: null,
      },
      {
        id: 2,
        parentId: 3,
        name: "John",
      }
    ),
    false,
    "given [a matcher where a value does not match] should [return false]"
  )

  t.equal(
    isMatch(
      {
        tag: (input: { id: number; userId: number }) => input.userId === 2,
      },
      {
        id: 2,
        tag: { id: 1, userId: 2 },
      }
    ),
    true,
    "given [a matcher with a predicate function on a nested object] should [return true]"
  )

  t.equal(
    isMatch(
      {
        id: 2,
        name: (item: string) => item !== "John",
      },
      {
        id: 2,
        name: "JohnX",
      }
    ),
    true,
    "given [a matcher mixing value and predicate function] should [return true when both match]"
  )

  t.equal(
    isMatch({ id: isSomething }, { id: 1, name: "test" }),
    true,
    "given [a matcher with a named predicate function] should [return true when predicate passes]"
  )

  t.equal(
    isMatch(
      {
        name: [
          (item: string) => item.toUpperCase(),
          (item: string) => item === "JOHN",
        ],
      },
      {
        id: 2,
        name: "John",
      }
    ),
    true,
    "given [a matcher with a pipe array predicate] should [compose the pipe and return true when it matches]"
  )

  t.equal(
    isMatch(
      {
        name: [
          (item: string) => item.toUpperCase(),
          (item: string) => item === "ALICE",
        ],
      },
      {
        id: 2,
        name: "John",
      }
    ),
    false,
    "given [a matcher with a pipe array predicate that does not match] should [return false]"
  )

  t.equal(
    isMatch({ a: Number.NaN }, { a: Number.NaN }),
    true,
    "given [NaN as a value] should [match NaN, as SameValueZero]"
  )

  t.equal(
    isMatch({ a: 0 }, { a: -0 }),
    true,
    "given [0 against -0] should [match]"
  )

  t.equal(
    isMatch({ a: (value: number) => (value as unknown) === 1 }, { a: 1 }),
    true,
    "given [a predicate that returns true] should [match]"
  )

  t.equal(
    isMatch({ a: (value: number) => value as unknown as boolean }, { a: 1 }),
    false,
    "given [a predicate that returns a truthy value, not true] should [not match]"
  )

  t.equal(
    isMatch({ tags: (tags: string[]) => tags.length === 1 }, { tags: ["a"] }),
    true,
    "given [a predicate on an array field] should [match an array with it]"
  )

  t.equal(
    isMatch({ "!tagId": isSomething }, { id: 1 } as Record<string, unknown>),
    true,
    "given [a negated predicate and a missing key] should [match when the key is nothing]"
  )

  t.equal(
    isMatch({ a: undefined }, JSON.parse('{"b":1}') as Record<string, unknown>),
    true,
    "given [undefined and a missing key] should [match]"
  )

  t.equal(
    isMatch({ constructor: undefined } as Record<string, unknown>, { id: 1 }),
    true,
    "given [a key the input only inherits from Object.prototype] should [read it as missing]"
  )

  t.end()
})

test("isMatch - curried", t => {
  t.equal(
    isMatch({
      id: 2,
      parentId: null,
    })({
      id: 2,
      parentId: null,
      name: "John",
    }),
    true,
    "given [a curried matcher with values present in the input] should [return true]"
  )

  t.equal(
    isMatch({
      "name": "John",
      "!parentId": null,
    })({
      id: 2,
      parentId: null,
      name: "John",
    }),
    false,
    "given [a negated matcher key that matches the input value] should [return false]"
  )

  t.equal(
    isMatch({
      "name": "John",
      "!parentId": null,
    })({
      id: 2,
      name: "John",
    }),
    true,
    "given [a negated matcher key where input value differs] should [return true]"
  )

  t.equal(
    isMatch({
      "!id": (item: unknown) => item === 3,
      "name": (item: unknown) => item !== "John",
    })({
      id: 2,
      name: "JohnX",
    }),
    true,
    "given [predicate functions with negation] should [return true when negated predicate fails and regular predicate passes]"
  )

  t.end()
})

test("isMatch - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      isMatch(42, { id: 1 })
    },
    /expected 'match' to be 'Object', got 'Number'/,
    "given [a number as matcher] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      isMatch("foo", { id: 1 })
    },
    /expected 'match' to be 'Object', got 'String'/,
    "given [a string as matcher] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      isMatch(null, { id: 1 })
    },
    /expected 'match' to be 'Object', got 'Null'/,
    "given [null as matcher] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      isMatch([1, 2], { id: 1 })
    },
    /expected 'match' to be 'Object', got 'Array'/,
    "given [an array as matcher] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      isMatch({ id: 1 }, 42)
    },
    /expected 'input' to be 'Object', got 'Number'/,
    "given [a number as input] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      isMatch({ id: [1, 2] }, { id: 1 })
    },
    /@asd14\/m\/isMatch: expected 'match.id\[0\]' to be 'Function', got 'Number'/,
    "given [an array value in a matcher slot] should [read it as a pipe and throw]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      isMatch({ tags: [1] }, { tags: [1] })
    },
    /expected 'match.tags\[0\]' to be 'Function', got 'Number'/,
    "given [an array of values in a matcher slot] should [read it as a pipe and throw]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      isMatch({ tags: [] }, { tags: [] })
    },
    /expected 'match.tags' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe array] should [throw]"
  )

  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => isMatch({ id: 1 }, new Date(0)),
    /expected 'input' to be 'Object', got 'Date'/,
    "given [a Date as input] should [throw TypeError]"
  )

  t.end()
})
