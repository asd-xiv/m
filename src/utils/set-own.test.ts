import test from "tape"

import { _setOwn } from "./set-own.ts"
import type { PlainObject } from "../../types/object.ts"

test("_setOwn - valid", t => {
  {
    const target: PlainObject = {}

    _setOwn(target, "a", 1)

    t.deepEqual(target, { a: 1 }, "given [a key] should [set it]")
  }

  {
    const target: PlainObject = { a: 1 }

    _setOwn(target, "a", 2)

    t.deepEqual(target, { a: 2 }, "given [an existing key] should [overwrite]")
  }

  t.end()
})

test("_setOwn - edge", t => {
  const target: PlainObject = {}

  _setOwn(target, "__proto__", { polluted: true })

  t.deepEqual(
    Object.keys(target),
    ["__proto__"],
    "given [__proto__] should [set an own key]"
  )
  t.equal(
    Object.getPrototypeOf(target),
    Object.prototype,
    "given [__proto__] should [keep the prototype]"
  )
  t.equal(
    Object.hasOwn(target, "polluted"),
    false,
    "given [__proto__] should [not copy the value's keys]"
  )
  t.equal(
    ({} as PlainObject)["polluted"],
    undefined,
    "given [__proto__] should [not pollute other objects]"
  )

  t.end()
})

test("_setOwn - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing that nothing is checked
      _setOwn(null, "a", 1)
    },
    TypeError,
    "given [a null target] should [throw the native error, no check]"
  )

  t.end()
})
