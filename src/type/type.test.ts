import test from "tape"

import { type } from "./type.js"

test("type - uncurried", t => {
  t.equal(type(null), "Null", "given [null] should [return Null]")
  t.equal(type(), "Undefined", "given [no argument] should [return Undefined]")
  t.equal(
    type(undefined),
    "Undefined",
    "given [undefined] should [return Undefined]"
  )
  t.equal(type(Number.NaN), "Number", "given [NaN] should [return Number]")
  t.equal(type(false), "Boolean", "given [false] should [return Boolean]")
  t.equal(type(2), "Number", "given [2] should [return Number]")
  t.equal(type(""), "String", 'given [""] should [return String]')
  t.equal(type([]), "Array", "given [[]] should [return Array]")
  t.equal(type({}), "Object", "given [{}] should [return Object]")
  t.equal(type(new Date()), "Date", "given [new Date()] should [return Date]")
  t.equal(
    type(() => {}),
    "Function",
    "given [() => {}] should [return Function]"
  )
  t.equal(type(/[A-z]/), "RegExp", "given [/[A-z]/] should [return RegExp]")
  t.equal(type(new Map()), "Map", "given [new Map()] should [return Map]")
  t.equal(
    type(new Error("x")),
    "Error",
    "given [an Error] should [return Error]"
  )
  t.equal(
    type(Symbol("a")),
    "Symbol",
    "given [a symbol] should [return Symbol]"
  )
  t.equal(
    type(Object.create(null)),
    "Object",
    "given [an object with a null prototype] should [return Object]"
  )

  {
    class User {
      name = "a"
    }

    t.equal(
      type(new User()),
      "User",
      "given [a class instance] should [return the class name]"
    )

    t.equal(
      type(Object.create(new User()) as object),
      "User",
      "given [an object that inherits a class instance] should [return the class name]"
    )
  }

  t.equal(
    type(Object.create(Object.create(null) as object) as object),
    "Object",
    "given [an object whose prototype has no constructor] should [return Object]"
  )

  t.equal(
    type(Object.create({ constructor: "x" }) as object),
    "Object",
    "given [an object whose constructor is not a function] should [return Object]"
  )

  t.equal(
    type(
      new (class {
        name = "a"
      })()
    ),
    "Object",
    "given [an instance of an anonymous class] should [return Object]"
  )

  t.equal(
    type(Promise.resolve(2)),
    "Promise",
    "given [Promise.resolve(2)] should [return Promise]"
  )

  t.end()
})
