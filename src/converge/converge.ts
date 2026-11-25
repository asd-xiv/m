import type { AnyMorphism } from "../../types/function.js"

import { type } from "../type/type.js"

type ConvergeFn = {
  // 5 branch functions - uncurried
  <Input extends unknown[], R1, R2, R3, R4, R5, O>(
    accFn: (...params: [R1, R2, R3, R4, R5]) => O,
    branchFns: readonly [
      (...input: Input) => R1,
      (...input: Input) => R2,
      (...input: Input) => R3,
      (...input: Input) => R4,
      (...input: Input) => R5,
    ],
    ...input: Input
  ): O
  // 5 branch functions - curried
  <Input extends unknown[], R1, R2, R3, R4, R5, O>(
    accFn: (...params: [R1, R2, R3, R4, R5]) => O,
    branchFns: readonly [
      (...input: Input) => R1,
      (...input: Input) => R2,
      (...input: Input) => R3,
      (...input: Input) => R4,
      (...input: Input) => R5,
    ]
  ): (...input: Input) => O

  // 4 branch functions - uncurried
  <Input extends unknown[], R1, R2, R3, R4, O>(
    accFn: (...params: [R1, R2, R3, R4]) => O,
    branchFns: readonly [
      (...input: Input) => R1,
      (...input: Input) => R2,
      (...input: Input) => R3,
      (...input: Input) => R4,
    ],
    ...input: Input
  ): O
  // 4 branch functions - curried
  <Input extends unknown[], R1, R2, R3, R4, O>(
    accFn: (...params: [R1, R2, R3, R4]) => O,
    branchFns: readonly [
      (...input: Input) => R1,
      (...input: Input) => R2,
      (...input: Input) => R3,
      (...input: Input) => R4,
    ]
  ): (...input: Input) => O

  // 3 branch functions - uncurried
  <Input extends unknown[], R1, R2, R3, O>(
    accFn: (...params: [R1, R2, R3]) => O,
    branchFns: readonly [
      (...input: Input) => R1,
      (...input: Input) => R2,
      (...input: Input) => R3,
    ],
    ...input: Input
  ): O
  // 3 branch functions - curried
  <Input extends unknown[], R1, R2, R3, O>(
    accFn: (...params: [R1, R2, R3]) => O,
    branchFns: readonly [
      (...input: Input) => R1,
      (...input: Input) => R2,
      (...input: Input) => R3,
    ]
  ): (...input: Input) => O

  // 2 branch functions - uncurried
  <Input extends unknown[], R1, R2, O>(
    accFn: (...params: [R1, R2]) => O,
    branchFns: readonly [(...input: Input) => R1, (...input: Input) => R2],
    ...input: Input
  ): O
  // 2 branch functions - curried
  <Input extends unknown[], R1, R2, O>(
    accFn: (...params: [R1, R2]) => O,
    branchFns: readonly [(...input: Input) => R1, (...input: Input) => R2]
  ): (...input: Input) => O

  // 1 branch function - uncurried
  <Input extends unknown[], R1, O>(
    accFn: (argument: R1) => O,
    branchFns: readonly [(...input: Input) => R1],
    ...input: Input
  ): O
  // 1 branch function - curried
  <Input extends unknown[], R1, O>(
    accFn: (argument: R1) => O,
    branchFns: readonly [(...input: Input) => R1]
  ): (...input: Input) => O
}

const _converge = (
  accFn: unknown,
  branchFns: unknown[],
  input: unknown[]
): unknown => {
  const results: unknown[] = []

  for (let index = 0, length = branchFns.length; index < length; index++) {
    results.push((branchFns[index] as AnyMorphism)(...input))
  }

  return (accFn as AnyMorphism)(...results) as unknown
}

/**
 * Apply an array of branch functions to the same arguments, then pass all
 * results as arguments to an accumulator function.
 *
 * Unlike `map` or `when`, pipe arrays are not supported for the accumulator
 * because the first function in the chain is variadic (receives N branch
 * results), which conflicts with pipe's unary composition model. Use
 * `pipe()` externally to compose the accumulator.
 *
 * @param {Function} accFn - Accumulator function receiving branch results
 * @param {Array} branchFns - Array of functions, each receiving all input args
 * @param {...unknown} input - Arguments spread to every branch function
 *
 * @returns {unknown} Result of applying accFn to all branch results
 *
 * @example
 * const divide = (a: number, b: number) => a / b
 * const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0)
 * const length = (xs: number[]) => xs.length
 *
 * converge(divide, [sum, length], [1, 2, 3, 4, 5, 6, 7])
 * // => 4
 *
 * converge(divide, [sum, length])([1, 2, 3, 4, 5, 6, 7])
 * // => 4
 *
 * pipe(
 *   converge(divide, [sum, length])
 * )([3, 6, 9])
 * // => 6
 *
 * // Multi-arg: spread all arguments to each branch
 * converge(
 *   (isAlive: boolean, neighbors: number) => isAlive && neighbors === 2,
 *   [(x: number) => x === 1, (x: number, y: number) => x + y],
 *   1, 5
 * )
 * // => false
 *
 * @name converge
 * @tag Function
 *
 * @see {@link pipe}
 */
const converge = ((...params: unknown[]) => {
  const accFn = params[0]

  if (typeof accFn !== "function") {
    throw new TypeError(
      `@asd14/m/converge: expected 'accFn' to be 'Function', got '${type(accFn)}'`
    )
  }

  const branchFns = params[1]

  if (!Array.isArray(branchFns)) {
    throw new TypeError(
      `@asd14/m/converge: expected 'branchFns' to be 'Array', got '${type(branchFns)}'`
    )
  }

  // @signature (accFn, branchFns) => (...input)
  if (params.length === 2) {
    return (...input: unknown[]) => _converge(accFn, branchFns, input)
  }

  // @signature (accFn, branchFns, ...input)
  return _converge(accFn, branchFns, params.slice(2))
}) as ConvergeFn

export { converge }
export type { ConvergeFn }
