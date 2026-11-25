import { type } from "../type/type.js"

type SumFn = {
  (...params: number[]): number
  (params: readonly number[]): number
}

/**
 * Add numbers together. Accepts variadic arguments or a single array. Throws
 * on an item that is not a number.
 *
 * @param {...number|number[]} params - Numbers to sum
 *
 * @returns {number} The sum of all arguments
 *
 * @example
 * sum(1, 2)
 * // => 3
 *
 * sum([1, 2, 3, 4])
 * // => 10
 *
 * pipe(map(read("score")), sum)([{ score: 1 }, { score: 2 }])
 * // => 3
 *
 * @name sum
 * @tag Number
 */
const sum = ((...params: unknown[]): number => {
  const items =
    params.length === 1 && Array.isArray(params[0])
      ? (params[0] as number[])
      : (params as number[])

  let result = 0

  for (let i = 0, length = items.length; i < length; i++) {
    const item = items[i]

    if (typeof item !== "number") {
      throw new TypeError(
        `@asd14/m/sum: expected 'params' to be 'Number', got '${type(item)}'`
      )
    }

    result += item
  }

  return result
}) as SumFn

export { sum }
export type { SumFn }
