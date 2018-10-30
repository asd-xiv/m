const test = require("tape")
const protoChain = require("./proto-chain")

/**
 * Return an array of constructor function names based on the prototype chain
 *
 * @param {Object}    source  Source input
 * @param {string[]}  acc     Accumulator array
 *
 * @returns {string[]}
 *
 * @tag Core
 * @signature (source: Object, acc: string[]): string[]
 */
test("core::protoChain", t => {
  t.deepEqual(protoChain({}), ["Object"], "Proto chain of object")

  t.deepEqual(
    protoChain(Object.create(null)),
    [],
    "Proto chain of object without Object proto"
  )

  /**
   * Prototypal enharitance
   */
  const MetaObject = function MetaObject() {
    // super constructor
    Object.call(this)

    this.me = () => this
  }

  MetaObject.prototype = Object.create(Object.prototype)
  MetaObject.prototype.constructor = MetaObject

  t.deepEqual(
    protoChain(new MetaObject()),
    ["MetaObject", "Object"],
    "Proto chain of object from MetaObject -> Object"
  )

  t.end()
})
