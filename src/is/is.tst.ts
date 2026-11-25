import { expect, test, describe } from "tstyche"

import {
  isSomething,
  isNothing,
  isNil,
  isTrue,
  isFalse,
  isPlainObject,
  isNumber,
  isString,
  isBoolean,
  isArray,
  isFunction,
} from "./is.js"

describe("isSomething", () => {
  test("isSomething - uncurried", () => {
    // given [a nullable type] should [narrow out null and undefined]
    {
      const input: string | null | undefined = "hello"

      if (isSomething(input)) {
        expect(input).type.toBe<string>()
      }
    }

    // given [a union with null] should [narrow to non-null branch]
    {
      const input: number | null = 42

      if (isSomething(input)) {
        expect(input).type.toBe<number>()
      }
    }

    // given [a union with undefined] should [narrow to non-undefined branch]
    {
      const isActive = true as boolean | undefined

      if (isSomething(isActive)) {
        expect(isActive).type.toBe<boolean>()
      }
    }

    // given [a non-nullable type] should [return the same type]
    {
      const input = "hello" as string

      if (isSomething(input)) {
        expect(input).type.toBe<string>()
      }
    }

    // should [return a boolean type guard]
    {
      const input: string | null = "hello"

      expect(isSomething(input)).type.toBe<boolean>()
    }
  })
})

describe("isNothing", () => {
  test("isNothing - uncurried", () => {
    // given [a nullable type] should [narrow to null or undefined]
    {
      const input = null as string | null | undefined

      if (isNothing(input)) {
        expect(input).type.toBe<null | undefined>()
      }
    }

    // given [a union with null] should [narrow to null]
    {
      const input: number | null = null

      if (isNothing(input)) {
        expect(input).type.toBe<null>()
      }
    }

    // given [a union with undefined] should [narrow to undefined]
    {
      const isActive: boolean | undefined = undefined

      if (isNothing(isActive)) {
        expect(isActive).type.toBe<undefined>()
      }
    }
  })

  test("isNothing - aliases", () => {
    expect(isNil).type.toBe<typeof isNothing>()
  })
})

describe("isTrue", () => {
  test("isTrue - uncurried", () => {
    // given [a boolean] should [narrow to true]
    {
      const isEnabled: boolean = true

      if (isTrue(isEnabled)) {
        expect(isEnabled).type.toBe<true>()
      }
    }

    // given [unknown] should [narrow to true]
    {
      const input: unknown = true

      if (isTrue(input)) {
        expect(input).type.toBe<true>()
      }
    }
  })
})

describe("isFalse", () => {
  test("isFalse - uncurried", () => {
    // given [a boolean] should [narrow to false]
    {
      const isEnabled: boolean = false

      if (isFalse(isEnabled)) {
        expect(isEnabled).type.toBe<false>()
      }
    }

    // given [unknown] should [narrow to false]
    {
      const input: unknown = false

      if (isFalse(input)) {
        expect(input).type.toBe<false>()
      }
    }
  })
})

describe("isPlainObject", () => {
  test("isPlainObject - uncurried", () => {
    // given [unknown] should [narrow to Record<string, unknown>]
    {
      const input: unknown = {}

      if (isPlainObject(input)) {
        expect(input).type.toBe<Record<string, unknown>>()
      }
    }

    // given [a union type] should [narrow to the object branch]
    {
      const input: string | Record<string, unknown> | null = {}

      if (isPlainObject(input)) {
        expect(input).type.toBe<Record<string, unknown>>()
      }
    }
  })
})

describe("isNumber", () => {
  test("isNumber - uncurried", () => {
    // given [unknown] should [narrow to number]
    {
      const input: unknown = 42

      if (isNumber(input)) {
        expect(input).type.toBe<number>()
      }
    }

    // given [a union type] should [narrow to number branch]
    {
      const input: string | number | null = 42

      if (isNumber(input)) {
        expect(input).type.toBe<number>()
      }
    }
  })
})

describe("isString", () => {
  test("isString - uncurried", () => {
    // given [unknown] should [narrow to string]
    {
      const input: unknown = "hello"

      if (isString(input)) {
        expect(input).type.toBe<string>()
      }
    }

    // given [a union type] should [narrow to string branch]
    {
      const input: string | number | null = "hello"

      if (isString(input)) {
        expect(input).type.toBe<string>()
      }
    }
  })
})

describe("isBoolean", () => {
  test("isBoolean - uncurried", () => {
    // given [unknown] should [narrow to boolean]
    {
      const input: unknown = true

      if (isBoolean(input)) {
        expect(input).type.toBe<boolean>()
      }
    }

    // given [a union type] should [narrow to boolean branch]
    {
      const input = true as string | boolean

      if (isBoolean(input)) {
        expect(input).type.toBe<boolean>()
      }
    }
  })
})

describe("isArray", () => {
  test("isArray - uncurried", () => {
    // given [unknown] should [narrow to unknown[]]
    {
      const input: unknown = [1, 2]

      if (isArray(input)) {
        expect(input).type.toBe<unknown[]>()
      }
    }

    // given [a union type] should [narrow to array branch]
    {
      const input: string | number[] = [1, 2]

      if (isArray(input)) {
        expect(input).type.toBe<number[]>()
      }
    }
  })
})

describe("isFunction", () => {
  test("isFunction - uncurried", () => {
    // given [unknown] should [narrow to function]
    {
      const input: unknown = () => {}

      if (isFunction(input)) {
        expect(input).type.toBe<(...params: unknown[]) => unknown>()
      }
    }

    // given [a union type] should [narrow to function branch]
    {
      const input: string | (() => void) = () => {}

      if (isFunction(input)) {
        expect(input).type.toBe<() => void>()
      }
    }
  })
})
