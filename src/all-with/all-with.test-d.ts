import { expectError, expectType } from "tsd"

import { allWith } from "./all-with.js"
import { is } from "../is/is.js"

{
  /**
   * Matcher Subset signature is correctly inferred from input
   */

  const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

  expectType<boolean>(
    allWith(
      {
        id: field => {
          expectType<number>(field)

          return is(field)
        },
      },
      input
    )
  )

  /**
   * When currying, Subset Matcher signature is not inferred and needs
   * explicit typing
   */

  expectType<boolean>(
    allWith({
      // @ts-ignore
      id: field => {
        expectType<any>(field)

        return is(field)
      },
    })(input)
  )
}

{
  const input = [{}, { id: 2 }, { id: 3 }]

  /**
   * When uncurried, Subset Matcher signature is checked against inferred
   * input type
   */

  expectError(
    allWith(
      {
        id: "uuid",
      },
      input
    )
  )

  const checkAllHaveId = allWith({
    id: is,
  })

  /**
   * When curried, input type is checked against Subset Matcher signature
   */

  expectError(checkAllHaveId(input))
}
