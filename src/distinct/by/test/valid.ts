import test from "tape"

import { distinctBy } from "../distinct-by.js"

test("distinctBy - valid", t => {
  t.deepEqual(
    distinctBy(
      (a: { id: number }, b: { id: number }) => a.id === b.id,
      [
        { id: 1, name: "a" },
        { id: 2, name: "b" },
        { id: 1, name: "c" },
      ]
    ),
    [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
    ],
    "given [equality by id] should [keep first occurrence per id]"
  )

  t.deepEqual(
    distinctBy((a: number, b: number) => a === b, []),
    [],
    "given [empty array] should [return empty array]"
  )

  {
    const calls: [number, number][] = []
    const record = (newItem: number, keptItem: number) => {
      calls.push([newItem, keptItem])

      return false
    }

    distinctBy(record, [1, 2, 3])

    t.deepEqual(
      calls,
      [
        [2, 1],
        [3, 1],
        [3, 2],
      ],
      "given [an asymmetric fn] should [call it with the new item first, the kept item second]"
    )
  }

  {
    const isNext = (newItem: number, keptItem: number) =>
      newItem === keptItem + 1

    t.deepEqual(
      distinctBy(isNext, [1, 2, 3, 5]),
      [1, 3, 5],
      "given [fn true when the new item follows a kept one] should [drop only items right after a kept one]"
    )
  }

  // Curried
  const byId = (
    a: { id: number; name: string },
    b: { id: number; name: string }
  ) => a.id === b.id

  t.deepEqual(
    distinctBy(byId)([
      { id: 1, name: "x" },
      { id: 1, name: "y" },
    ]),
    [{ id: 1, name: "x" }],
    "given [equality by id, curried] should [keep first occurrence]"
  )

  t.end()
})
