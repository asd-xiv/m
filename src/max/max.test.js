const test = require("tape")
const max = require("./max")
const i = require("../i/i")

/**
 * Find the maximum value in a source array
 *
 * @param  {Array|Function} arg1    Custom transform function or source array
 * @param  {number[]}       source  Array of numbers
 *
 * @return {number}
 *
 * @tag Array
 * @signature ( source: Number[] ): Number
 * @signature ( fn: Function ) => ( source: Number[] ): Number
 *
 * @example
 * max([-1, 1, 10, 3])
 * // => 10
 *
 * const fn = element => ( new Date( element.time ) )
 * const source = [
 *   { time: "2018-05-15T11:20:07.754110Z" },
 *   { time: "2018-06-11T09:01:54.337344Z" },
 *   { time: "2018-06-08T08:26:12.711071Z" },
 * ]
 * max(fn)(source)
 * // => {time: "2018-06-11T09:01:54.337344Z"}
 */

test("array::max", t => {
  t.equals(max([-1, 1, 10, 3]), 10, "Find max in numeric array")
  t.equals(max([]), null, "Find max in empty array (=> null)")
  t.equals(
    max(i)([]),
    null,
    "Find max in empty array using transform function (=> null)"
  )

  const fn = element => new Date(element.time)
  const source = [
    { time: "2018-05-15T11:20:07.754110Z" },
    { time: "2018-06-11T09:01:54.337344Z" },
    { time: "2018-06-08T08:26:12.711071Z" },
  ]

  t.deepEqual(
    max(fn)(source),
    { time: "2018-06-11T09:01:54.337344Z" },
    "Custom transform function"
  )

  t.end()
})
