# Prototype pollution tests

Tests are the primary way users learn how a function works. For a function that
writes keys from input, eg. `write`, `merge` or `groupBy`, they also show the
one thing a user cannot see from a call: what happens when the input comes from
an attacker. A request body can carry a key named `__proto__`, and an assignment
of that key replaces the prototype of the object it lands on.

m gives such a key no special meaning: `__proto__` and `constructor` are
ordinary own keys, and the prototype never changes. A test of a function that
writes keys shows that, for each payload below. The reader should walk away
knowing:

- **Which payloads reach a prototype** — and that the function stops each one
- **What the function returns instead** — an own key they can read back, or an
  error that names the bad part

## The payloads

| Payload                                 | Reaches the prototype through                    |
| :-------------------------------------- | :----------------------------------------------- |
| `JSON.parse('{"__proto__": {"x": 1}}')` | an own `__proto__` key, assigned to the result   |
| `"__proto__.x"`, `["__proto__", "x"]`   | a path segment                                   |
| `["constructor", "prototype", "x"]`     | the constructor's prototype                      |
| `[["__proto__"]]`, a key in an array    | a key that is not a string, coerced at the write |
| `"constructor"`, prototype frozen       | an assignment to a read-only inherited key       |

Test each payload the function can receive: a path payload for `write` and
`unflatten`, a key payload for `zipToObject` and `pick`, a JSON payload for
every function that copies the keys of an object.

## Full example

```ts
// write.test.ts
import test from "tape"

import { write } from "./write.js"
import { read } from "../read/read.js"

test("write - prototype pollution", t => {
  {
    const result = write(["__proto__", "x"], 1, {})

    t.deepEqual(
      Object.keys(result),
      ["__proto__"],
      "given [a __proto__ segment] should [write an own key]"
    )
    t.equal(
      Object.getPrototypeOf(result),
      Object.prototype,
      "given [a __proto__ segment] should [keep the prototype]"
    )
    t.equal(
      "x" in {},
      false,
      "given [a __proto__ segment] should [not pollute other objects]"
    )
  }

  {
    const result = write("constructor", 2, {})

    t.equal(
      result.constructor,
      2,
      "given [the key constructor] should [read back the written value with a dot]"
    )
    t.equal(
      read("constructor")(result),
      2,
      "given [the key constructor] should [read back the written value with read]"
    )
  }

  t.end()
})
```

## Rules

### Assert four facts per payload

| Fact                    | Assert                                                 |
| :---------------------- | :----------------------------------------------------- |
| the key is an own key   | `Object.keys(result)`, or `Object.hasOwn(result, key)` |
| it reads back           | with a dot, with brackets and with `read`              |
| the prototype stays     | `Object.getPrototypeOf(result) === Object.prototype`   |
| no other object changed | a fresh `{}` lacks the payload's key, eg. `"x" in {}`  |

One fact alone misses a case. A result with a replaced prototype still reads
`result.x` as `1`, so only the prototype check catches it.

### Expose before you fix

Run a new test against the code before the fix, and see it fail. A test that
passes on both sides proves nothing: an assignment to `constructor` already
creates an own key while `Object.prototype` is writable, so that test exposes a
bug only with a frozen prototype.

### A frozen prototype gets its own file

`Object.freeze(Object.prototype)` reaches every test that runs after it in the
same process. `node --test` runs each file in its own process, so put the freeze
in a file of its own, next to the function:

```ts
// set-own.frozen-prototype.test.ts
import test from "tape"

import { _setOwn } from "./set-own.js"
import type { PlainObject } from "../../types/object.js"

// An app can freeze Object.prototype to stop pollution. An assignment to a key
// the prototype has, eg. `constructor`, then throws. This file runs in its own
// process, so the freeze reaches no other test
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
```

### Write keys with `_setOwn`, never `Object.assign`

`Object.assign` and a `for…in` loop that assigns each key reach the `__proto__`
setter, so an own `__proto__` key from `JSON.parse` replaces the prototype of
the target. A spread, `{ ...object }`, and `Object.fromEntries` define keys
instead, and so does `_setOwn`, which every function of m writes through:

```ts
const body = JSON.parse('{"__proto__": {"isAdmin": true}}')

Object.assign({}, body).isAdmin
// => true: the copy's prototype is the attacker's object

merge({}, body).isAdmin
// => undefined: `merge` writes through _setOwn, so "__proto__" is an own key
```

### Build the result through the function, never by hand

Test the object the function returns. An object built with `Object.create` or a
cast, eg. `Object.create(frozen) as PlainObject`, is one m never writes into, so
its test proves nothing about m.
