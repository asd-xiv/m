/* eslint-disable unicorn/no-null,new-cap */

import test from "tape"

import { sort, sortBy } from "./sort.js"
import { sortWith } from "./sort-with.js"

test("sort", t => {
  t.deepEqual(
    sort([3, 2, 1]),
    [1, 2, 3],
    "given [an array with unsorted numbers] should [return an asc sorted array]"
  )

  t.deepEqual(
    sort("desc", [2, 4, 1]),
    [4, 2, 1],
    "given [an array with unsorted numbers] should [return an desc sorted array]"
  )

  t.deepEqual(
    sort("desc")(["a", "c", "b"]),
    ["c", "b", "a"],
    "given [an array with unsorted string] should [return an desc sorted array (curried)]"
  )

  t.end()
})

test("sortBy", t => {
  t.deepEqual(
    sortBy(
      (a, b) => a.position - b.position,
      [
        { id: 4, position: 5 },
        { id: 1, position: 3 },
        { id: 2, position: 2 },
      ]
    ),
    [
      { id: 2, position: 2 },
      { id: 1, position: 3 },
      { id: 4, position: 5 },
    ],
    "given [an array of objects and a custom compare function] should [return an sorted array]"
  )

  t.deepEqual(
    sortBy((a, b) => a.position - b.position)([
      { id: 5, position: null },
      { id: 3 },
      { id: 1, position: 3 },
      { id: 2, position: 2 },
      { id: 4, position: 5 },
    ]),
    [
      { id: 5, position: null },
      { id: 3 },
      { id: 2, position: 2 },
      { id: 1, position: 3 },
      { id: 4, position: 5 },
    ],
    "given [an array of objects and a custom compare function] should [return an sorted array (curried)]"
  )

  t.end()
})

test("sortWith", t => {
  t.deepEqual(
    sortWith(
      {
        isActive: "desc",
        position: "asc",
      },
      [
        { id: 4, position: 5, isActive: true },
        { id: 1, position: 3, isActive: true },
        { id: 3, position: 4, isActive: false },
        { id: 6, position: 0, isActive: false },
      ]
    ),
    [
      { id: 1, position: 3, isActive: true },
      { id: 4, position: 5, isActive: true },
      { id: 6, position: 0, isActive: false },
      { id: 3, position: 4, isActive: false },
    ],
    "given [an array of objects and a subset of 2 fields with different directions] should [return a sorted array]"
  )

  t.deepEqual(
    sortWith(
      {
        isActive: "desc",
        createdAt: (a, b) => new Date(a).getTime() - new Date(b).getTime(),
      },
      [
        { id: 5, createdAt: "12-02-2010", isActive: false },
        { id: 4, createdAt: "12-02-2011", isActive: true },
        { id: 6, createdAt: "12-02-2005", isActive: false },
        { id: 2, createdAt: "12-02-2003", isActive: true },
        { id: 11, createdAt: "12-02-2003" },
        { id: 12, createdAt: "12-02-2003", isActive: null },
      ]
    ),
    [
      { id: 2, createdAt: "12-02-2003", isActive: true },
      { id: 4, createdAt: "12-02-2011", isActive: true },
      { id: 6, createdAt: "12-02-2005", isActive: false },
      { id: 5, createdAt: "12-02-2010", isActive: false },
      { id: 12, createdAt: "12-02-2003", isActive: null },
      { id: 11, createdAt: "12-02-2003" },
    ],
    "given [an array of objects and a subset of 2 fields, one with a compare function] should [return a sorted array]"
  )

  t.deepEqual(
    sortWith({
      createdAt: input => new Date(input).getTime(),
    })([
      { id: 5, createdAt: "12-02-2010", isActive: false },
      { id: 4, createdAt: "12-02-2011", isActive: true },
      { id: 3, createdAt: "12-02-2001", isActive: false },
      { id: 6, createdAt: "12-02-2005", isActive: false },
      { id: 11, createdAt: "12-02-2003" },
    ]),
    [
      { id: 3, createdAt: "12-02-2001", isActive: false },
      { id: 11, createdAt: "12-02-2003" },
      { id: 6, createdAt: "12-02-2005", isActive: false },
      { id: 5, createdAt: "12-02-2010", isActive: false },
      { id: 4, createdAt: "12-02-2011", isActive: true },
    ],
    "given [an array of objects and a subset with a field transformer function] should [return a sorted array]"
  )

  t.deepEqual(
    sortWith(
      {
        createdAt: [input => new Date(input).getTime(), "desc"],
      },
      [
        { id: 5, createdAt: "12-02-2010", isActive: false },
        { id: 4, createdAt: "12-02-2011", isActive: true },
        { id: 3, createdAt: "12-02-2001", isActive: false },
        { id: 6, createdAt: "12-02-2005", isActive: false },
        { id: 11, createdAt: "12-02-2003" },
      ]
    ),
    [
      { id: 4, createdAt: "12-02-2011", isActive: true },
      { id: 5, createdAt: "12-02-2010", isActive: false },
      { id: 6, createdAt: "12-02-2005", isActive: false },
      { id: 11, createdAt: "12-02-2003" },
      { id: 3, createdAt: "12-02-2001", isActive: false },
    ],
    "given [an array of objects, a subset with a field transformer function and explicit direction] should [return a sorted array]"
  )

  t.deepEqual(
    sortWith(
      {
        createdAt: [input => new Date(input).getTime(), "desc"],
      },
      [
        { id: 5, createdAt: "12-02-2010", isActive: false },
        { id: 4, createdAt: "12-02-2011", isActive: true },
        { id: 3, createdAt: "12-02-2001", isActive: false },
        { id: 6, createdAt: "12-02-2005", isActive: false },
        { id: 11, createdAt: "12-02-2003" },
      ]
    ),
    [
      { id: 4, createdAt: "12-02-2011", isActive: true },
      { id: 5, createdAt: "12-02-2010", isActive: false },
      { id: 6, createdAt: "12-02-2005", isActive: false },
      { id: 11, createdAt: "12-02-2003" },
      { id: 3, createdAt: "12-02-2001", isActive: false },
    ],
    "given [an array of objects, a subset with a field transformer function and explicit direction] should [return a sorted array]"
  )

  t.throws(
    () =>
      sortWith(
        { createdAt: [input => new Date(input).getTime(), "doesc"] },
        []
      ),
    'Error: @asd14/m/sortWith: Unsuported sort direction for key "createdAt". Accepting "asc" or "desc", received "doesc".',
    "given [invalid sort direction] shold [throw]"
  )

  t.throws(
    () => sortWith({ createdAt: () => 2 }, []),
    'Error: @asd14/m/sortWith: Unsuported sort function signature for key "createdAt". Accepting function with one or two parameters, received 0.',
    "given [invalid sort function] shold [throw]"
  )

  t.end()
})
