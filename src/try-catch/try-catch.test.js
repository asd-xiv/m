import test from "tape"

import { inc } from "../inc/inc"
import { tryCatch } from "./try-catch"

test("tryCatch", t => {
  t.equals(
    tryCatch(inc)(10),
    11,
    "Given tryer function not throwing, apply tryer function on input"
  )

  t.equals(
    tryCatch(
      () => {
        throw new Error("Tryer error")
      },
      (error, source) => inc(source)
    )(10),
    11,
    "Given tryer function throwing, apply catcher function on input"
  )

  t.end()
})
