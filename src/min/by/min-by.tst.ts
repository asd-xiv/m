import { describe, expect, test } from "tstyche"

import { minBy } from "./min-by.js"

type User = { id: number; age: number }

const readAge = (user: User) => user.age

describe("minBy", () => {
  test("minBy - uncurried", () => {
    const users: User[] = [{ id: 1, age: 30 }]

    expect(minBy(readAge, users)).type.toBe<User | undefined>()

    {
      const readonlyUsers: readonly User[] = users

      expect(minBy(readAge, readonlyUsers)).type.toBe<User | undefined>()
    }

    expect(
      minBy(
        [
          user => {
            expect(user).type.toBe<User>()

            return user.age
          },
          age => age,
        ],
        users
      )
    ).type.toBe<User | undefined>()
  })

  test("minBy - curried", () => {
    const users: User[] = [{ id: 1, age: 30 }]

    expect(minBy(readAge)(users)).type.toBe<User | undefined>()
  })

  test("minBy - invalid input", () => {
    const labels = ["a", "b"]

    // @ts-expect-error No overload matches this call.
    minBy((label: string) => label, labels)
  })
})
