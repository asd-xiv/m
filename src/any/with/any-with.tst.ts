import { expect, test, describe } from "tstyche"

import { anyWith, hasWith } from "./any-with.js"
import { isSomething } from "../../is/is.js"

describe("anyWith", () => {
  test("anyWith - uncurried", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(
      anyWith(
        {
          id: field => {
            expect(field).type.toBe<number>()

            return isSomething(field)
          },
        },
        input
      )
    ).type.toBe<boolean>()

    {
      // a readonly array is accepted
      const input: readonly { id: number }[] = [{ id: 1 }, { id: 2 }]

      expect(anyWith({ id: 1 }, input)).type.toBe<boolean>()
    }
  })

  test("anyWith - curried", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(
      anyWith({
        id: isSomething,
      })(input)
    ).type.toBe<boolean>()
  })

  test("anyWith - invalid input", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    // @ts-expect-error Type 'string' is not assignable to type 'KeyMatcher<number> | undefined'.
    anyWith({ id: "uuid" }, input)

    // @ts-expect-error Object literal may only specify known properties, and 'id' does not exist in type 'readonly { id: unknown; }[]'.
    anyWith({ id: isSomething }, { id: 1, name: "test" })

    // @ts-expect-error Type '[string]' is not assignable to type 'KeyMatcher<string[]> | undefined'.
    anyWith({ tags: ["a"] }, [{ tags: ["a"] }])
  })

  test("anyWith - aliases", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(hasWith({ id: isSomething }, input)).type.toBe<boolean>()
  })
})
