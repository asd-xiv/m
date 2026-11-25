import test from "tape"

import { converge } from "./converge.js"
import { count } from "../count/count.js"
import { inc } from "../inc/inc.js"
import { sum } from "../sum/sum.js"

const add = (a: number, b: number) => a + b
const divide = (a: number, b: number) => a / b
const double = (x: number) => x * 2

test("converge - uncurried", t => {
  t.equal(
    converge(divide, [sum, count], [1, 2, 3, 4, 5, 6, 7]),
    4,
    "given [divide as accumulator and sum/length as branches] should [return average]"
  )

  t.equal(
    converge(add, [double, inc], 5),
    16,
    "given [add as accumulator and double/inc as branches with number input] should [return sum of double and inc]"
  )

  t.equal(
    converge(
      (a: string, b: number) => `${a}:${b}`,
      [(x: { name: string }) => x.name, (x: { age: number }) => x.age],
      { name: "alice", age: 30 }
    ),
    "alice:30",
    "given [string formatter and object property extractors] should [format correctly]"
  )

  t.equal(
    converge((x: number) => x, [(x: number) => x], 42),
    42,
    "given [single branch function] should [pass its result to accumulator]"
  )

  t.equal(
    converge(
      (isAlive: boolean, neighborCount: number) =>
        isAlive && neighborCount === 2,
      [(x: number) => x === 1, (x: number, y: number) => x + y],
      1,
      5
    ),
    false,
    "given [multi-arg input spread to branches] should [spread all args to each branch]"
  )

  t.equal(
    converge(
      (a: number, b: string) => `${a}-${b}`,
      [
        (x: number, y: number, z: number) => x + y + z,
        (x: number) => String(x),
      ],
      10,
      20,
      30
    ),
    "60-10",
    "given [3 args spread to branches] should [each branch receive all 3 args]"
  )

  t.end()
})

test("converge - curried", t => {
  t.equal(
    converge(divide, [sum, count])([1, 2, 3, 4, 5, 6, 7]),
    4,
    "given [divide as accumulator and sum/length as branches with curried input] should [return average]"
  )

  t.equal(
    converge(add, [double, inc])(5),
    16,
    "given [curried add as accumulator and double/inc as branches] should [return sum of double and inc]"
  )

  const isAliveWithTwoNeighbors = converge(
    (isAlive: boolean, neighborCount: number) => isAlive && neighborCount === 2,
    [(x: number, _y: number) => x === 1, (x: number, y: number) => x + y]
  )

  t.equal(
    isAliveWithTwoNeighbors(1, 5),
    false,
    "given [curried multi-arg form] should [return variadic function that spreads args]"
  )

  t.equal(
    isAliveWithTwoNeighbors(1, 1),
    true,
    "given [curried multi-arg form with matching condition] should [return true]"
  )

  t.end()
})

test("converge - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- intentionally testing wrong input type
      converge(42, [double], 5)
    },
    /expected 'accFn' to be 'Function', got 'Number'/,
    "given [a number as accumulator] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- intentionally testing wrong input type
      converge("foo", [double], 5)
    },
    /expected 'accFn' to be 'Function', got 'String'/,
    "given [a string as accumulator] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- intentionally testing wrong input type
      converge(null, [double], 5)
    },
    /expected 'accFn' to be 'Function', got 'Null'/,
    "given [null as accumulator] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- intentionally testing wrong input type
      converge(add, "not-array", 5)
    },
    /expected 'branchFns' to be 'Array', got 'String'/,
    "given [a string as branch functions] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      converge(add, "x")
    },
    /expected 'branchFns' to be 'Array', got 'String'/,
    "given [a string as branch functions, curried] should [throw at once]"
  )

  t.end()
})
