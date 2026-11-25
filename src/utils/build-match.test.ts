import test from "tape"

import { _buildMatch } from "./build-match.js"

const options = { fnName: "filterWith", inputName: "input[*]" }
const isAdult = (age: number): boolean => age >= 18

test("_buildMatch - valid", t => {
  const isAdminAdult = _buildMatch({ role: "admin", age: isAdult }, options)

  t.equal(
    isAdminAdult({ role: "admin", age: 30 }),
    true,
    "given [a plain value and a function] should [pass when both match]"
  )
  t.equal(
    isAdminAdult({ role: "user", age: 30 }),
    false,
    "given [a different plain value] should [fail]"
  )
  t.equal(
    isAdminAdult({ role: "admin", age: 10 }),
    false,
    "given [a failing function] should [fail]"
  )

  t.equal(
    _buildMatch(
      { age: [(age: number) => age + 1, isAdult] },
      options
    )({
      age: 17,
    }),
    true,
    "given [a pipe array] should [compose it]"
  )

  t.equal(
    _buildMatch({ "!role": "admin" }, options)({ role: "user" }),
    true,
    "given [a negated plain value] should [pass when it differs]"
  )
  t.equal(
    _buildMatch({ "!role": "admin" }, options)({ role: "admin" }),
    false,
    "given [a negated plain value] should [fail when it equals]"
  )
  t.equal(
    _buildMatch({ "!age": isAdult }, options)({ age: 10 }),
    true,
    "given [a negated function] should [pass when it fails]"
  )

  t.equal(
    _buildMatch({}, options)({ a: 1 }),
    true,
    "given [an empty matcher] should [pass]"
  )

  t.end()
})

test("_buildMatch - edge", t => {
  t.equal(
    _buildMatch({ a: NaN }, options)({ a: NaN }),
    true,
    "given [NaN] should [equal NaN, SameValueZero]"
  )

  t.equal(
    _buildMatch({ a: () => 1 }, options)({ a: 1 }),
    false,
    "given [a function returning a truthy non true] should [fail]"
  )

  t.equal(
    _buildMatch({ a: undefined }, options)({}),
    true,
    "given [undefined and a missing key] should [pass]"
  )

  {
    const seen: unknown[] = []

    _buildMatch(
      {
        toString: (value: unknown) => {
          seen.push(value)

          return true
        },
      },
      options
    )({})

    t.deepEqual(
      seen,
      [undefined],
      "given [an inherited key name] should [read only own keys]"
    )
  }

  t.equal(
    _buildMatch({ a: 1 }, options)(Object.create(null) as object),
    false,
    "given [a null prototype input] should [accept it]"
  )

  t.end()
})

test("_buildMatch - invalid input", t => {
  t.throws(
    () => _buildMatch(42, options),
    /@asd14\/m\/filterWith: expected 'match' to be 'Object', got 'Number'/,
    "given [a non object matcher] should [throw]"
  )

  t.throws(
    () => _buildMatch({ a: [] }, options),
    /expected 'match.a' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe array] should [name the path]"
  )

  t.throws(
    () => _buildMatch({ a: [() => 1, 2] }, options),
    /expected 'match.a\[1\]' to be 'Function', got 'Number'/,
    "given [a non function pipe item] should [name the path]"
  )

  t.throws(
    () => _buildMatch({ a: 1 }, options)(null),
    /@asd14\/m\/filterWith: expected 'input\[\*\]' to be 'Object', got 'Null'/,
    "given [a null input] should [name the input]"
  )

  t.end()
})
