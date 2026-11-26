import { describe, expect, test } from "tstyche"

import type {
  DeepPartial,
  DeepValue,
  DeepValues,
  Merge,
  PlainObject,
} from "./object.js"

describe("PlainObject", () => {
  test("PlainObject - valid input", () => {
    expect<{ name: string }>().type.toBeAssignableTo<PlainObject>()
    expect<{
      id: number
      nested: { a: 1 }
    }>().type.toBeAssignableTo<PlainObject>()
    expect<Record<string, number>>().type.toBeAssignableTo<PlainObject>()
  })
})

describe("Merge", () => {
  test("Merge - valid input", () => {
    expect<Merge<{ a: string; b: number }, { b: string }>>().type.toBe<{
      a: string
      b: string
    }>()

    expect<Merge<{ a: string }, { b: number }>>().type.toBe<{
      a: string
      b: number
    }>()

    expect<
      Merge<{ a: string; b: number; c: boolean }, { a: number }>
    >().type.toBe<{
      b: number
      c: boolean
      a: number
    }>()
  })
})

describe("DeepPartial", () => {
  test("DeepPartial - valid input", () => {
    expect<DeepPartial<{ a: string; b: number }>>().type.toBe<{
      a?: string
      b?: number
    }>()

    expect<DeepPartial<{ a: { b: { c: string } } }>>().type.toBe<{
      a?: { b?: { c?: string } }
    }>()
  })
})

describe("DeepValue", () => {
  test("DeepValue - single key", () => {
    expect<
      DeepValue<{ name: string; age: number }, ["name"]>
    >().type.toBe<string>()
    expect<
      DeepValue<{ name: string; age: number }, ["age"]>
    >().type.toBe<number>()
  })

  test("DeepValue - deep path", () => {
    type Nested = { a: { b: { c: string } } }

    expect<DeepValue<Nested, ["a"]>>().type.toBe<{ b: { c: string } }>()
    expect<DeepValue<Nested, ["a", "b"]>>().type.toBe<{ c: string }>()
    expect<DeepValue<Nested, ["a", "b", "c"]>>().type.toBe<string>()
  })

  test("DeepValue - array index", () => {
    expect<DeepValue<number[], [number]>>().type.toBe<number>()
    expect<DeepValue<number[][], [number]>>().type.toBe<number[]>()
    expect<DeepValue<number[][], [number, number]>>().type.toBe<number>()
  })

  test("DeepValue - missing key", () => {
    expect<DeepValue<{ a: string }, ["b"]>>().type.toBe<undefined>()
    expect<DeepValue<{ a: string }, ["a", "x"]>>().type.toBe<undefined>()
  })

  test("DeepValue - empty path", () => {
    expect<DeepValue<{ a: string }, []>>().type.toBe<{ a: string }>()
  })
})

describe("DeepValues", () => {
  test("DeepValues - objects", () => {
    expect<DeepValues<{ a: number; b: string }>>().type.toBe<number | string>()
    expect<DeepValues<{ a: number; b: { c: boolean } }>>().type.toBe<
      number | boolean
    >()
    expect<DeepValues<{ a: Date }>>().type.toBe<Date>()
  })

  test("DeepValues - arrays", () => {
    // An array is not a leaf: its items are, at any depth
    expect<DeepValues<{ tags: string[] }>>().type.toBe<string>()
    expect<DeepValues<{ cells: number[][] }>>().type.toBe<number>()
    expect<DeepValues<{ users: { name: string }[] }>>().type.toBe<string>()
    expect<DeepValues<{ empty: never[] }>>().type.toBe<never>()
  })

  test("DeepValues - recursive types", () => {
    // A tree refers to itself through an array, a peer through an object
    type Tree = { name: string; children: Tree[] }
    type Peer = { id: number; peer?: Peer }

    expect<DeepValues<Tree>>().type.toBe<string>()
    expect<DeepValues<Peer>>().type.toBe<number | undefined>()
  })
})
