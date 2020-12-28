import test from "tape"

import { i } from "../i/i"
import { max, maxBy } from "./max"

test("max", t => {
  t.equals(max([-1, 1, 10, 3]), 10, "Find max in numeric array")
  t.equals(max([]), undefined, "Find max in empty array (=> undefined)")
  t.equals(max([-1, -10, -3]), -1, "Find max in all negative numeric array")
  t.equals(max([1, 10, 3]), 10, "Find max in all positive numeric array")

  t.end()
})

const toDate = element => new Date(element.time)

test("maxBy", t => {
  t.equals(maxBy(i, [1, 10, 3]), 10, "Find max in all positive numeric array")

  t.equals(
    maxBy(i, []),
    undefined,
    "Find max in empty array using transform function (=> undefined)"
  )

  t.deepEquals(
    maxBy(toDate, [
      { time: "2018-05-15T11:20:07.754110Z" },
      { time: "2018-06-11T09:01:54.337344Z" },
      { time: "2018-06-08T08:26:12.711071Z" },
    ]),
    { time: "2018-06-11T09:01:54.337344Z" },
    "Custom transform function"
  )

  t.end()
})
