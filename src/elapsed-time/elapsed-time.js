const oneDay = 60 * 60 * 24
const oneHour = 60 * 60
const oneMinute = 60
const oneSecond = 1000

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
module.exports = startDate => endDate => {
  const timePassedInSec = Math.abs(startDate - endDate) / oneSecond

  // Number of days
  const days = Math.floor(timePassedInSec / oneDay)

  // Hours left after removing days
  const hours = Math.floor((timePassedInSec - days * oneDay) / oneHour)

  // Minutes left after removing days and hours
  const minutes = Math.floor(
    (timePassedInSec - days * oneDay - hours * oneHour) / oneMinute
  )

  // Seconds left after removing days, hours and minutes
  const seconds = Math.floor(
    timePassedInSec - days * oneDay - hours * oneHour - minutes * oneMinute
  )

  return {
    days,
    hours,
    minutes,
    seconds,
  }
}
