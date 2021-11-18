import test from "tape"

import { i } from "../i/i.js"
import { min, minBy } from "./min.js"

test("min", t => {
  t.equals(min([-1, 1, 10, 3]), -1, "Find min in numeric array")

  t.equals(min([]), undefined, "Find min in empty array (=> undefined)")

  t.equals(min([1, 10, 3]), 1, "Find min in all positive numeric array")

  t.equals(min([-1, -10, -3]), -10, "Find min in all negative numeric array")

  t.end()
})

const toDate = element => new Date(element.time)

test("minBy", t => {
  t.equals(
    minBy(i, []),
    undefined,
    "Find min in empty array using transform function (=> undefined)"
  )

  t.deepEquals(
    minBy(toDate, [
      { time: "2018-06-11T09:01:54.337344Z" },
      { time: "2018-06-08T08:26:12.711071Z" },
      { time: "2018-05-15T11:20:07.754110Z" },
    ]),
    { time: "2018-05-15T11:20:07.754110Z" },
    "Custom transform function"
  )

  t.end()
})
