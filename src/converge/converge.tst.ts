import { expect, test, describe } from "tstyche"

import { converge } from "./converge.js"
import { count } from "../count/count.js"
import { inc } from "../inc/inc.js"
import { sum } from "../sum/sum.js"

const add = (a: number, b: number): number => a + b
const double = (x: number): number => x * 2
const toString = (x: number): string => String(x)

describe("converge", () => {
  test("converge - uncurried", () => {
    // 2 branches, single arg
    expect(converge(add, [double, inc], 5)).type.toBe<number>()

    // Return type inferred from accumulator
    expect(
      converge((a, b) => `${a}:${b}`, [double, inc], 5)
    ).type.toBe<string>()

    // 1 branch
    expect(converge(toString, [double], 5)).type.toBe<string>()

    {
      const branches = [double, inc] as const

      expect(converge(add, branches, 5)).type.toBe<number>()
    }

    // 3 branches
    expect(
      converge((a, b, c) => `${a}-${b}-${c}`, [double, inc, toString], 5)
    ).type.toBe<string>()

    // Average pattern: divide(sum(xs), count(xs))
    expect(
      converge((a, b) => a / b, [sum, count], [1, 2, 3])
    ).type.toBe<number>()

    // Multi-arg spread
    expect(
      converge(
        (isAlive: boolean, neighbors: number) => isAlive && neighbors === 2,
        [(x: number) => x === 1, (x: number, y: number) => x + y],
        1,
        5
      )
    ).type.toBe<boolean>()

    // 3 args spread to branches
    expect(
      converge(
        (a: number, b: string) => `${a}-${b}`,
        [
          (x: number, y: number, z: number) => x + y + z,
          (x: number) => String(x),
        ],
        10,
        20,
        30
      )
    ).type.toBe<string>()
  })

  test("converge - curried", () => {
    // Single-arg curried returns unary function
    expect(converge(add, [double, inc])).type.toBe<(input: number) => number>()
    expect(converge(add, [double, inc])(5)).type.toBe<number>()
    expect(converge(toString, [double])).type.toBe<(input: number) => string>()

    // Multi-arg curried returns variadic function
    // All branches must declare the same params for Input inference
    expect(
      converge(
        (isAlive: boolean, neighbors: number) => isAlive && neighbors === 2,
        [(x: number, _y: number) => x === 1, (x: number, y: number) => x + y]
      )
    ).type.toBe<(x: number, _y: number) => boolean>()
  })

  test("converge - invalid input", () => {
    expect(converge).type.not.toBeCallableWith(42, [double], 5)

    expect(converge).type.not.toBeCallableWith("foo", [double], 5)
  })
})
