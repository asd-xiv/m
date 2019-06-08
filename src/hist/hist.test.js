import test from "tape"
import { hist } from ".."

test("hist", t => {
  const scores = [
    {
      name: "Bob",
      score: 1,
    },
    {
      name: "Alice",
      score: 10,
      subject: "Math",
    },
    {
      name: "Hatter",
      score: 10,
      subject: "Math",
    },
  ]

  t.deepEqual(
    hist([1, 1, 2, 3, 4, 5, 1, 2, 3]),
    {
      1: 3,
      2: 2,
      3: 2,
      4: 1,
      5: 1,
    },
    "object with distinct values and their occurrence"
  )

  t.deepEqual(
    hist("score")(scores),
    {
      1: 1,
      10: 2,
    },
    "object with distinct values and their occurrence"
  )

  t.deepEqual(
    hist("subject")(scores),
    {
      Math: 2,
    },
    "object with occurrences even if field is not defined on some elements"
  )

  t.end()
})
