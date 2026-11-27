import test from "tape"

import { flatten } from "../flatten.js"

test("flatten - invalid", t => {
  // A request body can hold both "user.role" and { user: { role } }. Both
  // flatten to "user.role", so one role would be lost without an error
  t.throws(
    () => flatten({ "user": { role: "user" }, "user.role": "admin" }),
    /@asd14\/m\/flatten: expected 'user.role' to be 'Unique', got 'Duplicate'/,
    "given [a key that contains the separator, next to the same nested path] should [throw TypeError]"
  )

  t.throws(
    () => flatten({ "user.role": "admin", "user": { role: "user" } }),
    /expected 'user.role' to be 'Unique', got 'Duplicate'/,
    "given [the same collision in the other order] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => flatten(42),
    /expected 'input' to be 'Array' or 'Object', got 'Number'/,
    "given [a number] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => flatten("foo"),
    /expected 'input' to be 'Array' or 'Object', got 'String'/,
    "given [a string] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => flatten(null),
    /expected 'input' to be 'Array' or 'Object', got 'Null'/,
    "given [null] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong options type
    () => flatten("level", [1, [2]]),
    /expected 'options' to be 'Object', got 'String'/,
    "given [a string as options] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => flatten({ level: 1 }, 42),
    /expected 'input' to be 'Array' or 'Object', got 'Number'/,
    "given [options and a number] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => flatten(new Date(0)),
    /expected 'input' to be 'Array' or 'Object', got 'Date'/,
    "given [a Date] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong level type
    () => flatten({ level: "1" }, [1, [2]]),
    /expected 'level' to be 'Number', got 'String'/,
    "given [a string level] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong separator type
    () => flatten({ separator: 1 }, { a: { b: 1 } }),
    /expected 'separator' to be 'String', got 'Number'/,
    "given [a number separator] should [throw TypeError]"
  )

  t.end()
})
