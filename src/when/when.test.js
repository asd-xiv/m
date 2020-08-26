import test from "tape"
import { inc, dec, when } from ".."

const isEven = source => source % 2 !== 0

test("when", t => {
  t.equals(
    when(isEven, "even", "odd")(5),
    "even",
    "Primitive instead of then function"
  )

  t.equals(
    when(isEven, "even", "odd")(6),
    "odd",
    "Primitive instead of else function"
  )

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
