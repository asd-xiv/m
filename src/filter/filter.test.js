import test from "tape"

import { isEqual } from "../is-equal/is-equal.js"
import { read } from "../read/read.js"
import { filter, filterWith } from "./filter.js"

test("filter", t => {
  t.deepEqual(
    filter(filterElm => filterElm <= 3)([1, 2, 3, 4, 5, 6]),
    [1, 2, 3],
    "Keep items lower or equal than 3 - curried"
  )

  t.deepEqual(
    filter(filterElm => filterElm <= 3, "asd"),
    [],
    "Run filter for non-array input, treat as array of one (input does not match function) - uncurried"
  )

  t.deepEqual(
    filter(filterElm => filterElm <= 3)(3),
    [3],
    "Run filter for non-array input, treat as array of one (input matches function)"
  )

  t.deepEqual(
    filter([read("items"), isEqual(1)])([
      { id: 2, items: 2 },
      { id: 3, items: 1 },
      { id: 4, items: 2 },
    ]),
    [{ id: 3, items: 1 }],
    "Keep items in array that have properties that equal - curried"
  )

  t.end()
})

test("filterWith", t => {
  t.deepEqual(
    filterWith({
      items: 2,
    })([
      { id: 2, items: 2 },
      { id: 3, items: 1 },
      { id: 4, items: 2 },
    ]),
    [
      { id: 2, items: 2 },
      { id: 4, items: 2 },
    ],
    "Keep items in array that have properties that equal - curried"
  )

  t.deepEqual(
    filterWith(
      {
        "!id": 2,
      },
      [{ lorem: 2 }, { lorem: 3 }, { id: 2 }]
    ),
    [{ lorem: 2 }, { lorem: 3 }],
    "Keep items in array that have properties that dont equal - uncurried"
  )

  t.end()
})
