const test = require("tape")
const repeat = require("../repeat/repeat")
const get = require("../get/get")
const gt = require("../gt/gt")
const hist = require("../hist/hist")
const chiSquaredTest = require("chi-squared-test")

const coinToss = require("./coin-toss")

/**
 * Simulate coin toss
 *
 * @return {boolean}  True for heads, false for tails
 */
test("number::coinToss", t => {
  const observationCount = 600

  const observationsHist =
    observationCount |> repeat(() => coinToss()) |> hist |> Object.values

  const expectedHist =
    observationsHist.length
    |> repeat(() => observationCount / observationsHist.length)

  t.equals(
    chiSquaredTest(observationsHist, expectedHist, 1)
      |> get("chiSquared")
      |> gt(3.84),
    true,
    `Toss a coin ${observationCount} times`
  )

  t.end()
})
