import test from "tape"
import { count, countWith } from ".."

test("count(With)", t => {
  t.equal(count("123"), 3, "Count chars in string")

  t.equal(
    count({ 1: "1", 2: "2", 3: "3" }),
    3,
    "Count key/value pairs in object"
  )

  t.equal(count([1, 2, 3]), 3, "Count items of array")

  t.equal(
    count(item => item.score === 10)([
      { name: "Bob", score: 1 },
      { name: "Alice", score: 10, subject: "Math" },
      { name: "Hatter", score: 10, subject: "Math" },
    ]),
    2,
    "Count items that satisfy function"
  )

  t.equal(
    countWith({
      subject: "Math",
      score: value => value > 5,
    })([
      { name: "Bob", score: 1, subject: "CS" },
      { name: "Alice", score: 10, subject: "Math" },
      { name: "Hatter", score: 10, subject: "Math" },
    ]),
    2,
    "Count items that match subset"
  )

  t.end()
})
