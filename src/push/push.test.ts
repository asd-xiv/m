import test from "tape"

import { push } from "./push.js"

test("push - curried", t => {
  t.deepEqual(
    push(4)([1, 2, 3]),
    [1, 2, 3, 4],
    "given [single element] should [append to end]"
  )

  t.deepEqual(
    push(4, 5)([1, 2, 3]),
    [1, 2, 3, 4, 5],
    "given [multiple elements] should [append all to end]"
  )

  t.deepEqual(push(null)([1]), [1, null], "given [null] should [append null]")

  t.deepEqual(push()([]), [], "given [no elements] should [return same array]")

  t.deepEqual(
    push([])([]),
    [[]],
    "given [empty array as element] should [append the array as element]"
  )

  {
    const input: readonly number[] = [1, 2]
    const output = push(3)(input)

    t.deepEqual(
      [output, input],
      [
        [1, 2, 3],
        [1, 2],
      ],
      "given [a readonly array] should [return a new array and leave the input alone]"
    )
  }

  t.end()
})

test("push - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      push(4)("not-an-array")
    },
    /expected 'input' to be 'Array', got 'String'/,
    "given [non-array input] should [throw TypeError]"
  )

  t.end()
})
