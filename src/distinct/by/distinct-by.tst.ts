import { expect, test, describe } from "tstyche"

import { distinctBy } from "./distinct-by.js"

type User = { id: number; name: string }

const byId = (a: User, b: User) => a.id === b.id

describe("distinctBy", () => {
  test("distinctBy - uncurried", () => {
    const input: User[] = [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
    ]

    expect(distinctBy(byId, input)).type.toBe<User[]>()
  })

  test("distinctBy - curried", () => {
    const fn = distinctBy(byId)

    expect(fn).type.toBe<(input: readonly User[]) => User[]>()
  })

  test("distinctBy - invalid input", () => {
    expect(distinctBy).type.not.toBeCallableWith(byId, [{ id: 1 }])
  })
})
