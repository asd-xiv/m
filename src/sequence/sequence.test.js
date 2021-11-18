import test from "tape"

import { isTrue } from "../is/is.js"
import { sequence, sequenceWhile } from "./sequence.js"

const delay = (ms, value) =>
  new Promise(resolve => setTimeout(() => resolve(value), ms))

test("sequence", t => {
  t.throws(
    () => sequence(),
    /Invalid source array. Expected array of functions but got "undefined"/,
    "Throw error when source array is not array"
  )

  t.throws(
    () => sequence([]),
    /Invalid source array. Expected array of functions but got "\[]"/,
    "Throw error when source array is empty"
  )

  let sum = 0

  const input = [
    () => {
      sum++

      return 1
    },
    previous => {
      sum += previous

      return delay(10, 2)
    },
    previous => {
      sum += previous

      return Promise.resolve("abc")
    },
    previous => {
      sum += previous

      return Promise.all([Promise.resolve(3), Promise.resolve(4)])
    },
  ]

  return sequence(input).then(result => {
    t.deepEqual(
      [sum, result],
      [`${1 + 1 + 2}abc`, [1, 2, "abc", [3, 4]]],
      "All promise functions run in sequence, each having access to previous result"
    )

    t.end()
  })
})

test("sequenceWith", t => {
  t.throws(
    () => sequenceWhile(),
    /Invalid predicate control function. Expected function but got "undefined"/,
    "Throw error when predicate function invalid"
  )

  let sum = 1

  return sequenceWhile(isTrue, [() => true, () => false, () => true])
    .then(result => {
      t.deepEqual(
        result,
        [true, false],
        "Two promise fn resolve with array of both resolved values"
      )
    })
    .then(() => sequenceWhile(isTrue, [() => true]))
    .then(result => {
      t.deepEqual(
        result,
        [true],
        "One successfull promise fn resolve with array of resolved value"
      )
    })
    .then(() => sequenceWhile(isTrue, [() => false]))
    .then(result => {
      t.deepEqual(
        result,
        [false],
        "One failing promise fn resolve with array of resolved value"
      )
    })
    .then(() =>
      sequenceWhile(
        input => input <= 5,
        [
          () => 1,

          previous => {
            sum += previous

            return delay(10, 2)
          },

          previous => {
            sum += previous

            return delay(10, 100)
          },

          previous => {
            sum += previous

            return delay(10, 2)
          },

          previous => {
            sum += previous

            return delay(10, 5)
          },
        ]
      )
    )
    .then(result => {
      t.deepEqual(
        [sum, result],
        [1 + 1 + 2, [1, 2, 100]],
        "Promise functions run in sequence until control fn fails. No further promises will run"
      )

      t.end()
    })
})
