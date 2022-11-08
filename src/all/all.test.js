/* eslint-disable unicorn/no-null */

import test from "tape"

import { all } from "./all.js"
import { is } from "../is/is.js"

/**
 * @internal
 * @param {number} input
 * @returns {boolean}
 */
const isEven = input => input % 2 === 0

test("all", t => {
  t.equal(
    all(item => isEven(item), [2, 6, 4]),
    true,
    "given [isEven predicate and an array of even numbers] should [return true]"
  )

  t.equal(
    all(isEven)([2, 6, 4]),
    true,
    "given [isEven predicate and an array of even numbers] should [return true] (curried)"
  )

  t.equal(
    all(item => is(item.id))([{}, { id: 2 }, { id: null }]),
    false,
    "given [a predicate asserting the existance of .id field and an object array with elements missing .id field] should [return false]"
  )

  t.equal(
    all([item => item.id, item => !!item], [{ id: 1 }, { id: 2 }, { id: 3 }]),
    true,
    "given [a predicate pipe asserting the existance of .id field and an object array with all elements having .id field] should [return true]"
  )

  t.end()
})
