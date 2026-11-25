import { expect, test, describe } from "tstyche"

import { intersectBy } from "./intersect-by.js"

type User = { id: number; name: string }

const byId = (a: User, b: User) => a.id === b.id

describe("intersectBy", () => {
  test("intersectBy - uncurried", () => {
    const a: User[] = [{ id: 1, name: "a" }]
    const input: User[] = [{ id: 1, name: "b" }]

    expect(intersectBy(byId, a, input)).type.toBe<User[]>()

    {
      const known: readonly User[] = [{ id: 1, name: "a" }]

      expect(intersectBy(byId, known, input)).type.toBe<User[]>()
    }
  })

  test("intersectBy - curried", () => {
    const a: User[] = [{ id: 1, name: "a" }]
    const fn = intersectBy(byId, a)

    expect(fn).type.toBe<(input: readonly User[]) => User[]>()
  })

  test("intersectBy - invalid input", () => {
    // @ts-expect-error Expected 2-3 arguments, but got 1.
    intersectBy(byId)
  })
})
