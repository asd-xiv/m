import test from "tape"

import { inc } from "../inc/inc"
import { dec } from "../dec/dec"
import { when } from "./when"

const isEven = source => source % 2 !== 0

test("when", t => {
  t.equals(
    when(isEven, inc, dec)(5),
    6,
    'Increment even input with "then" & "else" defined (curried)'
  )

  t.equals(
    when(isEven, inc, dec, 5),
    6,
    'Increment even input with "then" & "else" defined (uncurried)'
  )

  t.equals(
    when(isEven, inc, dec)(6),
    5,
    'Decrement odd input with "then" & "else" defined'
  )

  t.equals(
    when(isEven, [inc, inc], dec)(5),
    7,
    'Run "then" as a pipe array of functions'
  )

  t.equals(
    when(isEven, inc, [dec, dec])(6),
    4,
    'Run "else" as a pipe array of functions'
  )

  t.equals(
    when([inc, isEven], inc, dec)(4),
    5,
    'Run "if" as a pipe array of functions'
  )

  t.equals(
    when(isEven, inc)(5),
    6,
    'Increment even input with only "then" defined (curried)'
  )

  t.equals(
    when(isEven, inc)(6),
    6,
    'Return same input when "if" is false with only "then" defined'
  )

  t.equals(
    when(isEven, inc)(6),
    6,
    'Return input if condition not met and "else" function not defined'
  )

  t.end()
})
