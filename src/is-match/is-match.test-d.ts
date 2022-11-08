// @tsconfig {"noImplicitAny": false}
//
import { expectType } from "tsd"

import { isMatch } from "./is-match.js"
import { is } from "../is/is.js"

{
  /**
   * Matcher Subset signature is correctly inferred from input
   */

  const input = { id: 1 }

  expectType<boolean>(
    isMatch(
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
    isMatch({
      // @ts-ignore
      id: field => {
        expectType<any>(field)

        return is(field)
      },
    })(input)
  )
}
