import test from "tape"
import chiSquaredTest from "chi-squared-test"

import { random } from "./random.js"
import { repeat } from "../repeat/repeat.js"
import { read as get } from "../read/read.js"
import { lt } from "../lt/lt.js"
import { hist } from "../hist/hist.js"
import { pipe } from "../pipe/pipe.js"

test("random", t => {
  const [min, max, observationCount] = [5, 10, 600]

  const observationsHist = pipe(
    repeat(() => random(min, max)),
    hist,
    Object.values
  )(observationCount)

  const expectedHist = repeat(() => observationCount / observationsHist.length)(
    observationsHist.length
  )

  t.equals(
    pipe(chiSquaredTest, get("chiSquared"), lt(11.07))(
      observationsHist,
      expectedHist,
      1
    ),
    true,
    `Generate ${observationCount} integers between ${min} and ${max}}`
  )

  t.end()
})
