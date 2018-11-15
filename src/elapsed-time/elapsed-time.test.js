const test = require("tape")
const elapsedTime = require("./elapsed-time")

/**
 * Calculate elapsed time between to dates. In days, hours, minutes and seconds
 *
 * @param  {Data}  startDate  Start date
 * @param  {Data}  endDate    End date
 *
 * @return {Object}
 *
 * @tag Data
 * @signature (startDate: Object) => (endDate: Object): Object
 *
 * @example
 * elapsedTime(
 *   new Date("June 1, 2018 00:00:00")
 * )(
 *   new Date("June 1, 2018 03:24:00")
 * )
 * // => { days: 0, hours: 3, minutes: 24, seconds: 0 }
 */
test("elapsedTime", t => {
  t.deepEqual(
    elapsedTime(new Date("June 1, 2018 00:00:00"))(
      new Date("June 2, 2018 03:24:00")
    ),
    { days: 1, hours: 3, minutes: 24, seconds: 0 },
    "Tell how many days, hours, minutes and second passed between 2 dates"
  )

  t.end()
})
