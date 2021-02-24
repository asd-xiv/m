/* eslint-disable unicorn/no-null */

import test from "tape"

import { is } from "../is/is"
import { read } from "../read/read"
import { gt } from "../gt/gt"

import { count, countBy, countWith } from "./count"

test("count", t => {
  t.equal(count([1, 2, 3, null]), 4, "Given array, should return length")

  t.equal(count([]), 0, "Given empty array, should return 0")

  t.equal(
    count({ a: 1, b: 2 }),
    2,
    "Given object, should return number of key/value pairs"
  )

  t.equal(count({}), 0, "Given empty object, should return 0")

  t.equal(count("xyz"), 3, "Given string, should return length")

  t.equal(count(3), 0, "Given number, should return 0")

  t.equal(count(null), 0, "Given number, should return 0")

  t.equal(count(), 0, "Given number, should return 0")

  t.end()
})

test("countBy", t => {
  t.equal(
    countBy(is)([1, 2, 3, null]),
    3,
    "Count items with predicate and array - curried"
  )

  t.equal(
    countBy(is, [1, 2, 3, null]),
    3,
    "Count items with predicate and array - uncurried"
  )

  t.equal(countBy(is, []), 0, "Count items with predicate and empty array")

  t.equal(
    countBy(
      [read("score"), gt(5)],
      [
        { name: "Bob", score: 1, subject: "CS" },
        { name: "Alice", score: 10, subject: "Math" },
        { name: "Hatter", score: 10, subject: "Math" },
      ]
    ),
    2,
    "Count items that match subset"
  )

  t.end()
})

test("countWith", t => {
  t.equal(
    countWith({
      subject: "Math",
      score: gt(5),
    })([
      { name: "Bob", score: 1, subject: "CS" },
      { name: "Alice", score: 10, subject: "Math" },
      { name: "Hatter", score: 10, subject: "Math" },
    ]),
    2,
    "Count items that match subset - curried"
  )

  t.equal(
    countWith(
      {
        subject: "Math",
        score: gt(5),
      },
      [
        { name: "Bob", score: 1, subject: "CS" },
        { name: "Alice", score: 10, subject: "Math" },
        { name: "Hatter", score: 10, subject: "Math" },
      ]
    ),
    2,
    "Count items that match subset - uncurried"
  )

  t.end()
})
