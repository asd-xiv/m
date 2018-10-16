const test = require("tape")
const checkType = require("./check-type")

test("core::checkType( { schema: Object, context: String } )( input: Object )", t => {
  t.doesNotThrow(() => {
    checkType({
      schema: { id: "Number" },
    })({ id: 2 })
  }, "valid Number type")

  t.throws(
    () => {
      checkType({
        schema: { id: "Number" },
      })({ id: "2" })
    },
    /^TypeError: Expected "id" to be "Number"/,
    "invalid Number type "
  )

  t.doesNotThrow(() => {
    checkType({
      schema: { id: "String" },
    })({ id: "UUID" })
  }, "valid String type")

  t.throws(
    () => {
      checkType({
        schema: { id: "String" },
      })({ id: 2 })
    },
    /^TypeError: Expected "id" to be "String"/,
    "invalid String type"
  )

  t.doesNotThrow(() => {
    checkType({
      schema: { tags: "Array" },
    })({ tags: [] })
  }, "valid Array type")

  t.throws(
    () => {
      checkType({
        schema: { tags: "Array" },
      })({ tags: {} })
    },
    /^TypeError: Expected "tags" to be "Array"/,
    "invalid Array type"
  )

  t.doesNotThrow(() => {
    checkType({
      schema: { author: "Object" },
    })({ author: {} })
  }, "valid Object type")

  t.throws(
    () => {
      checkType({
        schema: { author: "Object" },
      })({ author: null })
    },
    /^TypeError: Expected "author" to be "Object"/,
    "invalid Object type"
  )

  t.doesNotThrow(() => {
    checkType({
      schema: { fn: "Function" },
    })({ fn: () => {} })
  }, "valid Function type")

  t.throws(
    () => {
      checkType({
        schema: { fn: "Function" },
      })({ fn: 42 })
    },
    /^TypeError: Expected "fn" to be "Function"/,
    "invalid Function type"
  )

  t.doesNotThrow(() => {
    checkType({
      schema: {
        id: "Number|String",
        tags: "Array|Object",
      },
    })({
      id: "UUID",
      tags: [],
    })
  }, "valid multiple fields with multiple types")

  t.throws(
    () => {
      checkType({
        schema: {
          id: "Number|String",
          tags: "Array|Object",
        },
      })({
        id: null,
        tags: [],
      })
    },
    /^TypeError: Expected "id" to be "Number\|String"/,
    "invalid multiple fields with multiple types"
  )

  t.end()
})
