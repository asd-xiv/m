import test from "tape"
import { filter, filterWith } from ".."

test("array::filter", t => {
  t.deepEqual(
    filter(filterElm => filterElm <= 3)([1, 2, 3, 4, 5, 6]),
    [1, 2, 3],
    "Keep items lower or equal than 3"
  )

  t.deepEqual(
    filter(filterElm => filterElm <= 3)("asd"),
    [],
    "Run filter for non-array input, treat as array of one (input does not match function)"
  )

  t.deepEqual(
    filter(filterElm => filterElm <= 3)(3),
    [3],
    "Run filter for non-array input, treat as array of one (input matches function)"
  )

  t.deepEqual(
    filterWith({
      items: 2,
    })([{ id: 2, items: 2 }, { id: 3, items: 1 }, { id: 4, items: 2 }]),
    [{ id: 2, items: 2 }, { id: 4, items: 2 }],
    "Keep items in array that have properties that equal"
  )

  t.deepEqual(
    filterWith({
      "!id": 2,
    })([{ lorem: 2 }, { lorem: 3 }, { id: 2 }]),
    [{ lorem: 2 }, { lorem: 3 }],
    "Keep items in array that have properties that dont equal"
  )

  t.end()
})
