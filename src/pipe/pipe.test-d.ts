import { expectType, expectError } from "tsd"
import { pipe } from "./pipe.js"

const inc = (input: number): number => input + 1

const sum = (a: number, b: number): number => a + b

expectType<number>(pipe(sum)(1, 2))

expectError(pipe(sum, inc)(1, 2, 3))

const sumAll = (...props: number[]): number =>
  props.reduce((acc, current) => acc + current, 0)

expectType<number>(pipe(sumAll, inc)(1, 2, 3))
