import test from "tape"

import { isTrue } from "../is/is"
import { sequence, sequenceWhile } from "./sequence"

const delay = (ms, val) =>
  new Promise(resolve => setTimeout(() => resolve(val), ms))

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

  const source = [
    () => {
      sum++

      return 1
    },
    prev => {
      sum += prev

      return delay(10, 2)
    },
    prev => {
      sum += prev

      return Promise.resolve("abc")
    },
    prev => {
      sum += prev

      return Promise.all([Promise.resolve(3), Promise.resolve(4)])
    },
  ]

  return sequence(source).then(result => {
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

  return sequenceWhile(isTrue, [() => true, () => false])
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
      sequenceWhile(source => source <= 5, [
        () => 1,

        prev => {
          sum += prev

          return delay(10, 2)
        },

        prev => {
          sum += prev

          return delay(10, 100)
        },

        prev => {
          sum += prev

          return delay(10, 2)
        },

        prev => {
          sum += prev

          return delay(10, 5)
        },
      ])
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
