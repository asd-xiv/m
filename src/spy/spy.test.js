/* eslint-disable  new-cap */

import test from "tape"

import { pipe } from "../pipe/pipe.js"
import { top } from "../top/top.js"
import { spy } from "./spy.js"

const example = [{ id: 1 }, { id: 2 }, { id: "uuid" }]

test("spy", t => {
  t.deepEqual(
    pipe(spy(), input => input)(2),
    2,
    "given [no arguments pipe] should [return initial source value]"
  )

  t.deepEqual(
    pipe(spy("test"), input => input)(2),
    2,
    "given [unary pipe] should [return initial source value]"
  )

  t.deepEqual(
    pipe(
      spy({
        description: "First 2 items",
        transform: top(2),
      }),
      input => input
    )(example),
    example,
    "given [slicing and transformations] should [return initial source value]"
  )

  t.throws(
    () => pipe(spy("test"), input => input)(2, 3),
    "Error: @asd14/m/spy - Can only be called with 1 parameter, received 2",
    "given [multiple parameters when calling pipe] shold [throw since we cant proxy multiple values]"
  )

  t.end()
})
