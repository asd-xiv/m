import { expectError, expectType } from "tsd"

import { map } from "./map.js"

const double = (input: number): number => input * 2

{
  /**
   * Map morphism signature is correctly inferred from input
   */

  const input = [1, 2, 3]

  expectType<number[]>(
    map((item, index, array) => {
      expectType<number>(item)
      expectType<number>(index)
      expectType<number[]>(array)

      return item * 2
    }, input)
  )

  /**
   * When currying, map morphism signature is not inferred and needs
   * explicit typing
   */

  expectType<number[]>(
    map((item, index, array) => {
      expectType<unknown>(item)
      expectType<number>(index)
      expectType<unknown[]>(array)

      return (item as number) * 2
    })(input)
  )

  expectType<number[]>(map(double)(input))
}

{
  /**
   * When uncurried, map morphism signature is checked against
   * inferred input type
   */

  const input = [1, "2", 3]

  expectError(map(double, input))

  /**
   * When curried, input type is checked against map morphism signature
   */

  const doubleAllElements = map(double)

  expectError(doubleAllElements(input))
}
