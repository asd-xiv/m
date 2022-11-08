/* eslint-disable jsdoc/require-example */

import test from "tape"
import { pipe } from "./pipe.js"

/**
 * @param {number} input
 * @returns {number}
 */
const inc = input => input + 1

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
const sum = (a, b) => a + b

test("pipe", t => {
  t.throws(
    () => pipe()(2),
    /Error: @asd14\/m: pipe requires at least one argument/,
    "given [no functions] should [throw error]"
  )

  t.equals(
    pipe(inc)(3),
    4,
    "given [one function and one input parameter] should [return the result of that function called with input as parameter]"
  )

  t.equals(
    pipe(inc, inc)(2),
    4,
    "given [multiple functions and one input parameter] should [return the result of the last function (unary) called with the result of the previous function (unary)]"
  )

  t.equals(
    pipe(sum, inc)(1, 2),
    4,
    "given [multiple functions and multiple input parameters] should [return the result of the last function (unary) called with the result of the previous function (naray)]"
  )

  t.end()
})
