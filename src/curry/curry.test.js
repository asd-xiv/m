import test from "tape"

import { curry } from "./curry"

test("curry", t => {
  const sum = (a, b) => a + b

  // does nothing if there are enough parameters
  t.equal(curry(sum)(2, 3), 5)

  // curries the function if there aren't
  const addTwo = curry(sum)(2)

  t.equal(addTwo(3), 5)

  // can curry multiple times and pass multiple parameters on each curry
  const sumThree = (a, b, c) => a + b + c

  const addOne = curry(sumThree)(1)
  const addFourA = curry(addOne)(3)
  const addFourB = curry(sumThree)(2, 2)

  t.equal(addFourA(1), 5)
  t.equal(addFourA(1), addFourB(1))

  t.end()
})
