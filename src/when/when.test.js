import test from "tape"
import { inc, dec, when } from ".."

const isEven = source => source % 2 !== 0

test("when", t => {
  t.equals(
    when(isEven, inc, dec)(5),
    6,
    'Increment even input with "then" & "else" defined'
  )

  t.equals(
    when(isEven, inc, dec)(6),
    5,
    'Decrement odd input with "then" & "else" defined'
  )

  t.equals(
    when(isEven, inc)(5),
    6,
    'Increment even input with only "then" defined'
  )

  t.equals(
    when(isEven, inc)(6),
    6,
    'Return input if condition not met and "else" function not defined'
  )

  t.end()
})
