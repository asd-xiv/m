import test from "tape"
import { between } from ".."

test("between", t => {
  t.equals(between(2, 5)(3), true, "Number between default open interval")
  t.equals(between(2, 5)(5), false, "Number outside default open interval")

  t.equals(
    between(2, 5, { closed: true })(5),
    true,
    "Number between closed interval"
  )

  t.equals(
    between(2, 5, { closed: true })(1),
    false,
    "Number outside closed interval"
  )

  t.throws(
    () => between(5, 2)(1),
    /Left interval limit must be less than right limit/,
    "Left interval limit must be less than right limit"
  )

  t.end()
})
