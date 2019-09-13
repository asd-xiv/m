import test from "tape"
import { cases } from ".."

test("cases", t => {
  t.equal(
    cases([
      [x => x % 2 === 0, x => x * 2],
      [x => x % 2 === 1, x => x + 5],
      [x => x === 2, x => x / 2],
    ])(2),
    4,
    "cases should evaluate the first matching function over the input"
  )

  t.equal(
    cases([[x => x % 2 === 0, x => x * 2], [x => x === 2, x => x / 2]])(3),
    3,
    "cases should return the original value otherwise"
  )

  t.equal(
    cases(
      [[x => x % 2 === 0, x => x * 2], [x => x === 2, x => x / 2]],
      x => x * 3
    )(3),
    9,
    "cases allows passing an alternative otherwise handler"
  )

  t.end()
})
