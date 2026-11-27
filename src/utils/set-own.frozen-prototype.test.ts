import test from "tape"

import { _setOwn } from "./set-own.ts"
import type { PlainObject } from "../../types/object.ts"

// An app can freeze Object.prototype to stop pollution. An assignment to a key
// the prototype has, eg. `constructor`, then throws.
//
// This file runs in its own process, so the freeze reaches no other test
Object.freeze(Object.prototype)

test("_setOwn - frozen Object.prototype", t => {
  const result: PlainObject = {}

  _setOwn(result, "constructor", "admin")

  t.deepEqual(
    result,
    { constructor: "admin" },
    "given [a key of a frozen Object.prototype] should [set an own key, not throw]"
  )

  t.end()
})
