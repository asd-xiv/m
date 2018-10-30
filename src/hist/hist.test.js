const test = require("tape")
const hist = require("./hist")

/**
 * Determine the count of all field's distinct values in a list of objects
 * (aka histogram)
 *
 * @tag Array
 * @signature (field: string)(source: Object[]): Object
 *
 * @param   {string}    field   Field name to count
 * @param   {Object[]}  source  Array of objects
 *
 * @return  {Object}
 *
 * @example
 *
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
 * hist( "score" )( scores )
 * // => {
 * //  "1": 1,
 * //  "10": 2
 * // }
 *
 * hist( "subject" )( scores )
 * // => {
 * //  "Math": 2
 * // }
 */
test("array::hist(field: string)(source: Object[]): Object", t => {
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
    hist("score")(scores),
    { 1: 1, 10: 2 },
    "object with distinct values and their occurrence"
  )

  t.deepEqual(
    hist("subject")(scores),
    { Math: 2 },
    "object with occurrences even if field is not defined on some elements"
  )

  t.end()
})
