import { expectType, expectError } from "tsd"

import { all } from "./all.js"
import { is } from "../is/is.js"

const isEven = (input: number): boolean => input % 2 === 0

{
  /**
   * Predicate signature is correctly inferred from input
   */

  const input = [1, 2, 3]

  expectType<boolean>(
    all(item => {
      expectType<number>(item)

      return isEven(item)
    }, input)
  )

  /**
   * When currying, predicate signature is not inferred and needs explicit typing
   */

  expectType<boolean>(
    all(item => {
      expectType<unknown>(item)

      return isEven(item as number)
    })(input)
  )

  expectType<boolean>(all(isEven)(input))
}

{
  /**
   * Predicate Pipe signature is also correctly inferred
   */

  const input = [{ id: "string" }, { id: 2 }, { id: 3 }]

  expectType<boolean>(
    all(
      [
        item => {
          expectType<{ id: string } | { id: number }>(item)

          return item.id
        },
        field => {
          expectType<string | number>(field)

          return is(field)
        },
      ],
      input
    )
  )
}

{
  const input = [1, "2", 3]

  /**
   * When uncurried, predicate signature is checked against inferred input type
   */

  expectError(all(isEven, input))

  /**
   * When curried, input type is checked against predicate signature
   */

  const allIsEven = all(isEven)

  expectError(allIsEven(input))
}