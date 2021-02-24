/* eslint-disable unicorn/no-null */

import test from "tape"

import { isEqual } from "../is-equal/is-equal"
import { read } from "../read/read"
import { isMatch } from "./is-match"

test("isMatch", t => {
  t.deepEqual(
    isMatch({
      id: 2,
      parentId: null,
    })({
      id: 2,
      parentId: null,
      name: "John",
    }),
    true,
    "Properties are present and have equal values"
  )

  t.deepEqual(
    isMatch(
      {
        tag: [read("userId"), isEqual(2)],
      },
      {
        id: 2,
        tag: { id: 1, userId: 2 },
      }
    ),
    true,
    "Match using piped functions"
  )

  t.deepEqual(
    isMatch({
      name: "John",
      parentId: null,
    })({
      id: 2,
      parentId: 3,
      name: "John",
    }),
    false,
    "Properties are present but dont have equal values"
  )

  t.deepEqual(
    isMatch({
      name: "John",
      "!parentId": null,
    })({
      id: 2,
      parentId: null,
      name: "John",
    }),
    false,
    "Properties are present but dont have equal values (has negation)"
  )

  t.deepEqual(
    isMatch({
      name: "John",
      "!parentId": null,
    })({
      id: 2,
      name: "John",
    }),
    true,
    "Properties are not present"
  )

  t.deepEqual(
    isMatch({
      "!id": item => item === 3,
      name: item => item !== "John",
    })({
      id: 2,
      name: "JohnX",
    }),
    true,
    "Matching with predicate functions"
  )

  t.end()
})
