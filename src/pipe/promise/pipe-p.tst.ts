import { expect, test, describe } from "tstyche"

import { pipeP } from "./pipe-p.js"

const inc = (input: number): number => input + 1
const incP = (input: number): Promise<number> => Promise.resolve(input + 1)
const toString = (input: number): string => String(input)

describe("pipeP", () => {
  test("pipeP - uncurried", () => {
    expect(pipeP(incP)(2)).type.toBe<Promise<number>>()

    expect(pipeP(incP, inc)(2)).type.toBe<Promise<number>>()

    expect(pipeP(incP, toString)(2)).type.toBe<Promise<string>>()

    expect(pipeP(incP, inc, toString)(2)).type.toBe<Promise<string>>()
  })
})
