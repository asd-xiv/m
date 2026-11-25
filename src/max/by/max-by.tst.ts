import { describe, expect, test } from "tstyche"

import { maxBy } from "./max-by.js"

type User = { id: number; age: number }

const readAge = (user: User) => user.age

describe("maxBy", () => {
  test("maxBy - uncurried", () => {
    const users: User[] = [{ id: 1, age: 30 }]

    expect(maxBy(readAge, users)).type.toBe<User | undefined>()

    {
      const readonlyUsers: readonly User[] = users

      expect(maxBy(readAge, readonlyUsers)).type.toBe<User | undefined>()
    }

    expect(
      maxBy(
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

  test("maxBy - curried", () => {
    const users: User[] = [{ id: 1, age: 30 }]

    expect(maxBy(readAge)(users)).type.toBe<User | undefined>()
  })

  test("maxBy - invalid input", () => {
    const labels = ["a", "b"]

    // @ts-expect-error No overload matches this call.
    maxBy((label: string) => label, labels)
  })
})
