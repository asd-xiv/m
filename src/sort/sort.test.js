/* eslint-disable unicorn/no-null */

import { describe } from "riteway"
import { sort, sortBy } from "./sort"
import { sortWith } from "./sort-with"

describe("sort", async assert => {
  assert({
    given: "an array with unsorted numbers",
    should: "return an asc sorted array",
    actual: sort([3, 2, 1]),
    expected: [1, 2, 3],
  })

  assert({
    given: "an array with unsorted numbers",
    should: "return an desc sorted array",
    actual: sort("desc", [2, 4, 1]),
    expected: [4, 2, 1],
  })

  assert({
    given: "an array with unsorted strings",
    should: "return an desc sorted array (curried)",
    actual: sort("asc")(["a", "c", "b"]),
    expected: ["a", "b", "c"],
  })
})

describe("sortBy", async assert => {
  assert({
    given: "an array of objects and a custom compare function",
    should: "return an sorted array",
    actual: sortBy(
      (a, b) => a.position - b.position,
      [
        { id: 4, position: 5 },
        { id: 1, position: 3 },
        { id: 2, position: 2 },
      ]
    ),
    expected: [
      { id: 2, position: 2 },
      { id: 1, position: 3 },
      { id: 4, position: 5 },
    ],
  })

  assert({
    given: "an array of objects and a custom compare function",
    should: "return an sorted array (curried)",
    actual: sortBy((a, b) => a.position - b.position)([
      { id: 5, position: null },
      { id: 3 },
      { id: 1, position: 3 },
      { id: 2, position: 2 },
      { id: 4, position: 5 },
    ]),
    expected: [
      { id: 5, position: null },
      { id: 3 },
      { id: 2, position: 2 },
      { id: 1, position: 3 },
      { id: 4, position: 5 },
    ],
  })
})

describe("sortWith", async assert => {
  assert({
    given:
      "an array of objects and a subset of 2 fields with different directions",
    should: "return a sorted array",
    actual: sortWith(
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
    expected: [
      { id: 1, position: 3, isActive: true },
      { id: 4, position: 5, isActive: true },
      { id: 6, position: 0, isActive: false },
      { id: 3, position: 4, isActive: false },
    ],
  })

  assert({
    given:
      "an array of objects and a subset of 2 fields, one with a compare function",
    should: "return a sorted array",
    actual: sortWith(
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
    expected: [
      { id: 2, createdAt: "12-02-2003", isActive: true },
      { id: 4, createdAt: "12-02-2011", isActive: true },
      { id: 6, createdAt: "12-02-2005", isActive: false },
      { id: 5, createdAt: "12-02-2010", isActive: false },
      { id: 12, createdAt: "12-02-2003", isActive: null },
      { id: 11, createdAt: "12-02-2003" },
    ],
  })

  assert({
    given: "an array of objects and a subset with a field transformer function",
    should: "return a sorted array",
    actual: sortWith(
      {
        createdAt: source => new Date(source).getTime(),
      },
      [
        { id: 5, createdAt: "12-02-2010", isActive: false },
        { id: 4, createdAt: "12-02-2011", isActive: true },
        { id: 3, createdAt: "12-02-2001", isActive: false },
        { id: 6, createdAt: "12-02-2005", isActive: false },
        { id: 11, createdAt: "12-02-2003" },
      ]
    ),
    expected: [
      { id: 3, createdAt: "12-02-2001", isActive: false },
      { id: 11, createdAt: "12-02-2003" },
      { id: 6, createdAt: "12-02-2005", isActive: false },
      { id: 5, createdAt: "12-02-2010", isActive: false },
      { id: 4, createdAt: "12-02-2011", isActive: true },
    ],
  })

  assert({
    given:
      "an array of objects, a subset with a field transformer function and explicit direction",
    should: "return a sorted array",
    actual: sortWith(
      {
        createdAt: [source => new Date(source).getTime(), "desc"],
      },
      [
        { id: 5, createdAt: "12-02-2010", isActive: false },
        { id: 4, createdAt: "12-02-2011", isActive: true },
        { id: 3, createdAt: "12-02-2001", isActive: false },
        { id: 6, createdAt: "12-02-2005", isActive: false },
        { id: 11, createdAt: "12-02-2003" },
      ]
    ),
    expected: [
      { id: 4, createdAt: "12-02-2011", isActive: true },
      { id: 5, createdAt: "12-02-2010", isActive: false },
      { id: 6, createdAt: "12-02-2005", isActive: false },
      { id: 11, createdAt: "12-02-2003" },
      { id: 3, createdAt: "12-02-2001", isActive: false },
    ],
  })
})
