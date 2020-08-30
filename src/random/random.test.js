import test from "tape"
import chiSquaredTest from "chi-squared-test"

import { random, repeat, get, lt, hist, pipe } from ".."

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
