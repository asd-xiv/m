const test = require("tape")
const repeat = require("../repeat/repeat")
const get = require("../get/get")
const gt = require("../gt/gt")
const hist = require("../hist/hist")
const chiSquaredTest = require("chi-squared-test")

const random = require("./random")

/**
 * Generate random number between interval
 *
 * @param  {Object}   arg1      Props
 * @param  {number}   arg1.min  The minimum
 * @param  {number}   arg1.max  The maximum
 *
 * @return {integer}
 */
test("number::random", t => {
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
