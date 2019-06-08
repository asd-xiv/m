import test from "tape"
import chiSquaredTest from "chi-squared-test"

import { random, repeat, get, gt, hist } from ".."

test("random", t => {
  const [min, max, observationCount] = [5, 10, 600]

  const observationsHist =
    observationCount
    |> repeat(() => random({ min, max }))
    |> hist
    |> Object.values

  const expectedHist =
    observationsHist.length
    |> repeat(() => observationCount / observationsHist.length)

  t.equals(
    chiSquaredTest(observationsHist, expectedHist, 1)
      |> get("chiSquared")
      |> gt(11.07),
    true,
    `Generate ${observationCount} integers between ${min} and ${max}}`
  )

  t.end()
})
