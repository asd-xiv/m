/* eslint-disable unicorn/no-null */

import test from "tape"

import { protoChain } from "./proto-chain.js"

test("protoChain", t => {
  t.deepEqual(protoChain({}), ["Object"], "Proto chain of object")

  t.deepEqual(
    protoChain(Object.create(null)),
    [],
    "Proto chain of object without Object proto"
  )

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
