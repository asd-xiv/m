const test = require("tape")
const count = require("./count")

/**
 * Count the number of elements that satisfies a function
 *
 * @tag Array
 * @signature (fn: Function)(source: Array <Object>): number
 *
 * @param   {Function}        fn      Test function
 * @param   {Array <Object>}  source  Source array
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
 *  subject: "Math"
 * }]
 *
 * count( element => element.score === 10 )( scores )
 * // => 2
 */
test("array::count", t => {
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
    count(element => element.score === 10)(scores),
    2,
    "Count elements that satisfy function"
  )

  t.equal(count(scores), 3, "Count elements of an array")

  t.end()
})
