import test from "tape"

import { elapsedTime } from "./elapsed-time.js"

test("elapsedTime", t => {
  t.deepEqual(
    elapsedTime(
      new Date("June 1, 2018 00:00:00"),
      new Date("June 2, 2018 03:24:00")
    ),
    { days: 1, hours: 3, minutes: 24, seconds: 0 },
    "Tell how many days, hours, minutes and second passed between 2 dates"
  )

  t.end()
})
