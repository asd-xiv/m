const test = require("tape")
const countBy = require("./count-by")

/**
 * Count the number of objects that match a criteria
 *
 * @tag Array
 * @signature (matchObject: Object)(source: Object[]): number
 *
 * @param   {Object}    matchObject  Match object
 * @param   {Object[]}  source       Array of objects
 *
 * @return  {number}
 *
 * @example
 * const scores = [{
 *  name   : "Bob",
 *  score  : 1,
 *  subject: "Math"
 * }, {
 *  name   : "Alice",
 *  score  : 10,
 *  subject: "Math"
 * }, {
 *  name   : "Hatter",
 *  score  : 10,
 *  subject: "Nature"
 * }]
 *
 * countBy({
 *  "subject": "Math"
 * })(scores)
 * // => 2
 */
test("array::countBy(matchObject: Object)(source: Object[]): number", t => {
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

  t.equal(
    countBy({
      subject: "Math",
    })(scores),
    2,
    "Count items that match fields"
  )

  t.equal(
    countBy({
      subject: "NotExist",
    })(scores),
    0,
    "No items in source match criteria (missing value)"
  )

  t.equal(
    countBy({
      notExist: "StillNotExist",
    })(scores),
    0,
    "No items in source match criteria (missing field)"
  )

  t.end()
})
