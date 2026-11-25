import test from "tape"

import { evolveMany } from "./evolve-many.js"
import { inc } from "../../inc/inc.js"

test("evolveMany - uncurried", t => {
  t.deepEqual(
    evolveMany({ id: inc }, [{ id: 1 }, { id: 2 }, { id: 3 }]),
    [{ id: 2 }, { id: 3 }, { id: 4 }],
    "given [transformations and array] should [apply evolve to each item]"
  )

  {
    t.deepEqual(
      evolveMany({ id: inc }, [{ id: 1 }, { id: 2 }, { test: "dolor" }]),
      [{ id: 2 }, { id: 3 }, { test: "dolor" }],
      "given [items missing transformed key] should [skip missing keys]"
    )
  }

  {
    const items: readonly { id: number }[] = [{ id: 1 }]

    t.deepEqual(
      evolveMany({ id: String }, items),
      [{ id: "1" }],
      "given [a readonly array and a function changing the type] should [return the new type]"
    )
  }

  {
    const calls: unknown[][] = []

    evolveMany({ id: (...params: unknown[]) => calls.push(params) }, [
      { id: 1 },
    ])

    t.deepEqual(
      calls,
      [[1, { id: 1 }]],
      "given [a function] should [call it with the value and the item only]"
    )
  }

  t.end()
})

test("evolveMany - curried", t => {
  t.deepEqual(
    evolveMany({ id: inc })([{ id: 1 }, { id: 2 }]),
    [{ id: 2 }, { id: 3 }],
    "given [transformations, curried] should [return function that evolves array]"
  )

  t.end()
})

test("evolveMany - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => evolveMany(42),
    /expected 'patcher' to be 'Object', got 'Number'/,
    "given [non-object patcher] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => evolveMany({ a: inc }, "not-an-array"),
    /expected 'input' to be 'Array', got 'String'/,
    "given [non-array input] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => evolveMany({ id: inc }, [{ id: 1 }, null]),
    /@asd14\/m\/evolveMany: expected 'input\[\*\]' to be 'Object', got 'Null'/,
    "given [a null item] should [name the item in the error]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => evolveMany({ id: 1 }, [{ id: 1 }]),
    /expected 'patcher.id' to be 'Function' or 'Array', got 'Number'/,
    "given [a plain value in the patcher] should [throw TypeError]"
  )

  t.end()
})
