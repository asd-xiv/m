import { expectType } from "tsd"

import { curry } from "./curry.js"

// No parameter

const alwaysTrue = curry((): boolean => true)

expectType<boolean>(alwaysTrue())

// One parameter

const isNull = curry(<T>(input: T): boolean => input === null)

expectType<boolean>(isNull(3))

// Multiple parameters

const sum = curry((a: number, b: number, c: number): number => a + b + c)

expectType<(a: number) => (b: number) => number>(sum(1))

expectType<(c: number) => number>(sum(1)(2))

expectType<number>(sum(1)(2)(3))
