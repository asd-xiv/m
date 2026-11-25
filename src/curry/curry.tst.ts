import { expect, test, describe } from "tstyche"

import { curry } from "./curry.js"

describe("curry", () => {
  test("curry - uncurried", () => {
    {
      const fn = curry((): boolean => true)

      expect(fn).type.toBe<() => boolean>()
      expect(fn()).type.toBe<boolean>()
    }

    {
      const fn = curry((x: number): boolean => x > 0)

      expect(fn).type.toBe<(a: number) => boolean>()
      expect(fn(1)).type.toBe<boolean>()
    }

    {
      const fn = curry(
        (a: number, b: string): boolean => a > 0 && b.length !== 0
      )

      expect(fn).type.toBe<(a: number) => (b: string) => boolean>()
      expect(fn(1)).type.toBe<(b: string) => boolean>()
      expect(fn(1)("x")).type.toBe<boolean>()
    }

    {
      const fn = curry((a: number, b: number, c: number): number => a + b + c)

      expect(fn).type.toBe<
        (a: number) => (b: number) => (c: number) => number
      >()
      expect(fn(1)).type.toBe<(b: number) => (c: number) => number>()
      expect(fn(1)(2)).type.toBe<(c: number) => number>()
      expect(fn(1)(2)(3)).type.toBe<number>()
    }

    {
      const fn = curry(
        (a: number, b: number, c: number, d: number): number => a + b + c + d
      )

      expect(fn(1)(2)(3)(4)).type.toBe<number>()
    }

    {
      const fn = curry(
        (a: number, b: string, c: boolean, d: number, extra: string): string =>
          `${a}${b}${c}${d}${extra}`
      )

      expect(fn(1)("a")(true)(2)("b")).type.toBe<string>()
    }
  })

  test("curry - invalid input", () => {
    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type ...
    curry(2)

    const fn = curry((a: number, b: number): number => a + b)

    // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'number'.
    fn("not a number")
  })
})
