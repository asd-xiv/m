import { expect, test, describe } from "tstyche"

import { uniteBy } from "./unite-by.js"

type User = { id: number; name: string }

const byId = (a: User, b: User) => a.id === b.id

describe("uniteBy", () => {
  test("uniteBy - uncurried", () => {
    const a: User[] = [{ id: 1, name: "a" }]
    const b: User[] = [{ id: 2, name: "b" }]

    expect(uniteBy(byId, a, b)).type.toBe<User[]>()

    {
      const known: readonly User[] = [{ id: 1, name: "a" }]

      expect(uniteBy(byId, known, b)).type.toBe<User[]>()
    }
  })

  test("uniteBy - curried", () => {
    const a: User[] = [{ id: 1, name: "a" }]
    const fn = uniteBy(byId, a)

    expect(fn).type.toBe<(b: readonly User[]) => User[]>()
  })

  test("uniteBy - invalid input", () => {
    // @ts-expect-error Expected 2-3 arguments, but got 1.
    uniteBy(byId)
  })
})
