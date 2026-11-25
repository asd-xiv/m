import test from "tape"

// eslint-disable-next-line unicorn/prevent-abbreviations -- testing the zipToObj alias
import { zipToObject, zipToObj } from "./zip-to-object.js"

test("zipToObject - uncurried", t => {
  t.deepEqual(
    zipToObject(["a", "b"], [1, 2]),
    { a: 1, b: 2 },
    "given [keys and values of same length] should [return object with all pairs]"
  )

  t.deepEqual(
    zipToObject(["a"], [1, 2]),
    { a: 1 },
    "given [fewer keys than values] should [trim to keys length]"
  )

  t.deepEqual(
    zipToObject(["a", "b"], [2]),
    { a: 2 },
    "given [fewer values than keys] should [trim to values length]"
  )

  t.deepEqual(
    zipToObject([], [1, 2]),
    {},
    "given [empty keys] should [return empty object]"
  )

  t.deepEqual(
    zipToObject(["a", "b"], []),
    {},
    "given [empty values] should [return empty object]"
  )

  {
    const keys: readonly string[] = ["a", "b"]
    const values: readonly number[] = [1, 2]

    t.deepEqual(
      zipToObject(keys, values),
      { a: 1, b: 2 },
      "given [readonly arrays] should [return object with all pairs]"
    )
  }

  t.deepEqual(
    zipToObject(["a", "a"], [1, 2]),
    { a: 2 },
    "given [a repeated key] should [keep the last value]"
  )

  t.deepEqual(
    zipToObject(["toString"], [1]),
    { toString: 1 },
    "given [a key that exists on Object.prototype] should [set it as own key]"
  )

  {
    const result = zipToObject(["__proto__"], [{ x: 1 }])

    t.deepEqual(
      Object.keys(result),
      ["__proto__"],
      "given [the key __proto__] should [keep it as an own key]"
    )
    t.equal(
      Object.getPrototypeOf(result),
      Object.prototype,
      "given [the key __proto__] should [leave the prototype alone]"
    )
    t.equal(
      (result as Record<string, unknown>)["x"],
      undefined,
      "given [the key __proto__] should [not leak the value onto the object]"
    )
  }

  t.end()
})

test("zipToObject - curried", t => {
  t.deepEqual(
    zipToObject(["a", "b"])([1, 2]),
    { a: 1, b: 2 },
    "given [keys] should [return function that accepts values and builds object]"
  )

  t.deepEqual(
    zipToObject(["a"])([1, 2]),
    { a: 1 },
    "given [fewer keys than values, curried] should [trim to keys length]"
  )

  t.end()
})

test("zipToObject - invalid input", t => {
  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => zipToObject("a", [1]),
    /expected 'keys' to be 'Array', got 'String'/,
    "given [a string as keys] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => zipToObject(42, [1]),
    /expected 'keys' to be 'Array', got 'Number'/,
    "given [a number as keys] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => zipToObject(undefined),
    /expected 'keys' to be 'Array', got 'Undefined'/,
    "given [undefined as keys] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => zipToObject(["a"], 42),
    /expected 'values' to be 'Array', got 'Number'/,
    "given [a number as values] should [throw TypeError]"
  )

  t.end()
})

test("zipToObject - aliases", t => {
  t.equal(
    zipToObj,
    zipToObject,
    "given [zipToObj export] should [be an alias for zipToObject]"
  )

  t.end()
})
