import test from "tape"

import { _buildPatch } from "./build-patch.js"

const update = { fnName: "update", inputName: "input", isTransformOnly: false }
const evolve = { fnName: "evolve", inputName: "input", isTransformOnly: true }
const increment = (input: number): number => input + 1
const double = (input: number): number => input * 2

test("_buildPatch - valid", t => {
  t.deepEqual(
    _buildPatch({ count: increment, name: "bar" }, update)({ count: 1 }),
    { count: 2, name: "bar" },
    "given [a function and a plain value] should [transform and replace]"
  )

  t.deepEqual(
    _buildPatch({ count: [increment, double] }, update)({ count: 1 }),
    { count: 4 },
    "given [a pipe array] should [compose it]"
  )

  {
    const source = { a: 1, b: 2 }

    t.deepEqual(
      _buildPatch(
        { a: (value: number, whole: typeof source) => value + whole.b },
        update
      )(source),
      { a: 3, b: 2 },
      "given [a function] should [pass the value and the whole object]"
    )
  }

  {
    const source = { count: 1 }
    const result = _buildPatch({ count: increment }, update)(source)

    t.deepEqual(source, { count: 1 }, "given [an input] should [not mutate it]")
    t.notEqual(result, source, "given [an input] should [return a new object]")
  }

  t.deepEqual(
    _buildPatch({ count: increment }, evolve)({ count: 1, other: 0 }),
    { count: 2, other: 0 },
    "given [isTransformOnly] should [transform a present key]"
  )

  t.end()
})

test("_buildPatch - edge", t => {
  t.deepEqual(
    _buildPatch({ tags: () => ["x"] }, update)({}),
    { tags: ["x"] },
    "given [a missing key with update] should [set it]"
  )

  t.deepEqual(
    _buildPatch({ count: increment }, evolve)({}),
    {},
    "given [a missing key with isTransformOnly] should [skip it]"
  )

  t.deepEqual(
    _buildPatch({ a: 1 }, update)({ a: 0 }),
    { a: 1 },
    "given [a falsy current value] should [replace it]"
  )

  {
    const patcher = JSON.parse('{"__proto__": {"polluted": true}}') as object
    const result = _buildPatch(patcher, update)({})

    t.deepEqual(
      Object.keys(result),
      ["__proto__"],
      "given [a __proto__ key] should [set an own key]"
    )
    t.equal(
      Object.getPrototypeOf(result),
      Object.prototype,
      "given [a __proto__ key] should [keep the prototype]"
    )
  }

  {
    const inherited = Object.create({ count: 5 }) as Record<string, unknown>

    t.throws(
      () => _buildPatch({ count: increment }, update)(inherited),
      /expected 'input' to be 'Object'/,
      "given [a non plain input] should [throw]"
    )
  }

  t.deepEqual(
    _buildPatch({}, update)({ a: 1 }),
    { a: 1 },
    "given [an empty patcher] should [copy the input]"
  )

  t.end()
})

test("_buildPatch - invalid input", t => {
  t.throws(
    () => _buildPatch(42, update),
    /@asd14\/m\/update: expected 'patcher' to be 'Object', got 'Number'/,
    "given [a non object patcher] should [throw]"
  )

  t.throws(
    () => _buildPatch(new Date(), update),
    /expected 'patcher' to be 'Object', got 'Date'/,
    "given [a Date patcher] should [throw]"
  )

  t.throws(
    () => _buildPatch({ count: 1 }, { ...evolve, fnName: "evolveMany" }),
    /@asd14\/m\/evolveMany: expected 'patcher.count' to be 'Function' or 'Array', got 'Number'/,
    "given [a plain value with isTransformOnly] should [throw]"
  )

  t.throws(
    () => _buildPatch({ tags: [] }, update),
    /@asd14\/m\/update: expected 'patcher.tags' to be 'NonEmpty', got 'Empty'/,
    "given [an empty pipe array] should [name the path]"
  )

  t.throws(
    () => _buildPatch({ tags: [increment, 1] }, update),
    /expected 'patcher.tags\[1\]' to be 'Function', got 'Number'/,
    "given [a non function pipe item] should [name the path]"
  )

  t.throws(
    () => _buildPatch({ a: 1 }, { ...update, inputName: "input[*]" })("nope"),
    /expected 'input\[\*\]' to be 'Object', got 'String'/,
    "given [a non object input] should [name the input]"
  )

  t.end()
})
