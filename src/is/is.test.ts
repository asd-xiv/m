import test from "tape"

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

test("isSomething - uncurried", t => {
  t.equal(isSomething(false), true, "given [false] should [return true]")
  t.equal(isSomething(0), true, "given [0] should [return true]")
  t.equal(isSomething(""), true, "given [empty string] should [return true]")
  t.equal(isSomething(null), false, "given [null] should [return false]")
  t.equal(
    isSomething(undefined),
    false,
    "given [undefined] should [return false]"
  )
  t.equal(isSomething(Number.NaN), false, "given [NaN] should [return false]")

  t.end()
})

test("isNothing - uncurried", t => {
  t.equal(isNothing(false), false, "given [false] should [return false]")
  t.equal(isNothing(0), false, "given [0] should [return false]")
  t.equal(isNothing(""), false, "given [empty string] should [return false]")
  t.equal(isNothing(null), true, "given [null] should [return true]")
  t.equal(isNothing(undefined), true, "given [undefined] should [return true]")
  t.equal(isNothing(Number.NaN), true, "given [NaN] should [return true]")

  t.end()
})

test("isNothing - aliases", t => {
  t.equal(
    isNil,
    isNothing,
    "given [isNil] should [be the same function as isNothing]"
  )
  t.equal(isNil(null), true, "given [isNil with null] should [return true]")
  t.equal(isNil(0), false, "given [isNil with 0] should [return false]")

  t.end()
})

test("isTrue - uncurried", t => {
  t.equal(isTrue(""), false, "given [empty string] should [return false]")
  t.equal(isTrue(true), true, "given [boolean true] should [return true]")
  t.equal(isTrue(false), false, "given [boolean false] should [return false]")
  t.equal(isTrue(1), false, "given [number 1] should [return false]")

  t.end()
})

test("isFalse - uncurried", t => {
  t.equal(isFalse(""), false, "given [empty string] should [return false]")
  t.equal(isFalse(false), true, "given [boolean false] should [return true]")
  t.equal(isFalse(true), false, "given [boolean true] should [return false]")
  t.equal(isFalse(0), false, "given [number 0] should [return false]")

  t.end()
})

test("isPlainObject - uncurried", t => {
  t.equal(isPlainObject(null), false, "given [null] should [return false]")
  t.equal(isPlainObject({}), true, "given [empty object] should [return true]")
  t.equal(isPlainObject([]), false, "given [empty array] should [return false]")
  t.equal(
    isPlainObject("lorem"),
    false,
    "given [a string] should [return false]"
  )
  t.equal(isPlainObject(42), false, "given [a number] should [return false]")
  t.equal(
    isPlainObject(undefined),
    false,
    "given [undefined] should [return false]"
  )
  t.equal(
    isPlainObject(Object.create(null)),
    true,
    "given [an object with a null prototype] should [return true]"
  )
  t.equal(
    isPlainObject(new Date()),
    false,
    "given [a Date] should [return false]"
  )
  t.equal(
    isPlainObject(new Map()),
    false,
    "given [a Map] should [return false]"
  )
  t.equal(isPlainObject(/a/), false, "given [a RegExp] should [return false]")
  t.equal(
    isPlainObject(
      new (class User {
        name = "a"
      })()
    ),
    false,
    "given [a class instance] should [return false]"
  )

  t.end()
})

test("isNumber - uncurried", t => {
  t.equal(isNumber(42), true, "given [an integer] should [return true]")
  t.equal(isNumber(3.14), true, "given [a float] should [return true]")
  t.equal(isNumber(0), true, "given [zero] should [return true]")
  t.equal(isNumber(-1), true, "given [a negative number] should [return true]")
  t.equal(isNumber(Infinity), true, "given [Infinity] should [return true]")
  t.equal(isNumber(Number.NaN), false, "given [NaN] should [return false]")
  t.equal(
    isNumber("42"),
    false,
    "given [a numeric string] should [return false]"
  )
  t.equal(isNumber(null), false, "given [null] should [return false]")
  t.equal(isNumber(undefined), false, "given [undefined] should [return false]")

  t.end()
})

test("isString - uncurried", t => {
  t.equal(
    isString("hello"),
    true,
    "given [a string literal] should [return true]"
  )
  t.equal(isString(""), true, "given [an empty string] should [return true]")
  t.equal(isString(42), false, "given [a number] should [return false]")
  t.equal(isString(null), false, "given [null] should [return false]")
  t.equal(isString(undefined), false, "given [undefined] should [return false]")

  t.end()
})

test("isBoolean - uncurried", t => {
  t.equal(isBoolean(true), true, "given [true] should [return true]")
  t.equal(isBoolean(false), true, "given [false] should [return true]")
  t.equal(isBoolean(0), false, "given [zero] should [return false]")
  t.equal(isBoolean(""), false, "given [empty string] should [return false]")
  t.equal(isBoolean(null), false, "given [null] should [return false]")

  t.end()
})

test("isArray - uncurried", t => {
  t.equal(
    isArray([1, 2]),
    true,
    "given [an array with elements] should [return true]"
  )
  t.equal(isArray([]), true, "given [an empty array] should [return true]")
  t.equal(isArray("hello"), false, "given [a string] should [return false]")
  t.equal(isArray({}), false, "given [an object] should [return false]")
  t.equal(isArray(null), false, "given [null] should [return false]")

  t.end()
})

test("isFunction - uncurried", t => {
  t.equal(
    isFunction(() => {}),
    true,
    "given [an arrow function] should [return true]"
  )
  t.equal(
    isFunction(Math.max),
    true,
    "given [a built-in function] should [return true]"
  )
  t.equal(isFunction("hello"), false, "given [a string] should [return false]")
  t.equal(isFunction(null), false, "given [null] should [return false]")
  t.equal(isFunction(42), false, "given [a number] should [return false]")

  t.end()
})
