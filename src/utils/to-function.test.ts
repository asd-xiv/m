import test from "tape"

import { _toFunction } from "./to-function.js"

const options = { fnName: "filter", paramName: "fn" }
const increment = (input: number): number => input + 1
const double = (input: number): number => input * 2

test("_toFunction - valid", t => {
  t.equal(
    _toFunction(increment, options),
    increment,
    "given [a function] should [return it as is]"
  )

  t.equal(
    _toFunction([increment, double], options)(1),
    4,
    "given [a pipe array] should [compose left to right]"
  )

  t.end()
})

test("_toFunction - edge", t => {
  t.equal(
    _toFunction([increment], options)(1),
    2,
    "given [a one item array] should [apply it]"
  )

  t.end()
})

test("_toFunction - invalid input", t => {
  t.throws(
    () => _toFunction(42, options),
    /@asd14\/m\/filter: expected 'fn' to be 'Function' or 'Array', got 'Number'/,
    "given [a number] should [name the function and param]"
  )

  t.throws(
    () => _toFunction([], { fnName: "map", paramName: "fn" }),
    /@asd14\/m\/map: expected 'fn' to be 'NonEmpty', got 'Empty'/,
    "given [an empty array] should [throw]"
  )

  t.throws(
    () => _toFunction([increment, 1], options),
    /expected 'fn\[1\]' to be 'Function', got 'Number'/,
    "given [a non function item] should [name its index]"
  )

  t.throws(
    () => _toFunction(null, { fnName: "update", paramName: "patcher.tags" }),
    /@asd14\/m\/update: expected 'patcher.tags' to be 'Function' or 'Array', got 'Null'/,
    "given [a nested param name] should [use it]"
  )

  t.end()
})
