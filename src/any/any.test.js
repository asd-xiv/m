/* eslint-disable unicorn/no-null */

import test from "tape"

import { any, anyWith } from "./any"
import { read } from "../read/read"

const isNumber = source => Number.isFinite(source)

test("any", t => {
  t.equal(
    any(1, [1, "string", Number.NaN]),
    true,
    "Check any element is equal to primitive"
  )

  t.equal(
    any(isNumber, [1, "string", Number.NaN]),
    true,
    "Check any element is number"
  )

  t.equal(
    any(
      [read("boolFlag"), item => item === true],
      [null, "2", { boolFlag: true }]
    ),
    true,
    "Check any element has a field using piped functions"
  )

  t.equal(any(isNumber, [null, "2", {}]), false, "Check any element is number")

  t.equal(any(isNumber, 2), true, "Check non array input")

  t.end()
})

test("anyWith", t => {
  t.equal(
    anyWith(
      {
        id: isNumber,
        name: "lorem",
      },
      [
        { id: "uuid", name: "lorem" },
        { id: 2, name: "foo" },
        { id: 3, name: "lorem", foo: "bar" },
      ]
    ),
    true,
    "Array should contain object that satisfies conditions"
  )

  t.end()
})
