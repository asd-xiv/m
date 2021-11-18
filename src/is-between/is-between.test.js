import test from "tape"

import { isBetween } from "./is-between.js"

test("isBetween", t => {
  t.equals(isBetween(2, 5)(3), true, "Number isBetween default open interval")
  t.equals(isBetween(2, 5)(5), false, "Number outside default open interval")

  t.equals(
    isBetween(2, 5, { closed: true })(5),
    true,
    "Number isBetween closed interval"
  )

  t.equals(
    isBetween(2, 5, { closed: true })(1),
    false,
    "Number outside closed interval"
  )

  t.throws(
    () => isBetween(5, 2)(1),
    /Left interval limit must be less than right limit/,
    "Left interval limit must be less than right limit"
  )

  t.end()
})
