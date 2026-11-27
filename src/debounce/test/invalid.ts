import test from "tape"

import { debounce } from "../debounce.js"

test("debounce - invalid", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      debounce("nope")
    },
    /@asd14\/m\/debounce: expected 'fn' to be 'Function', got 'String'/,
    "given [a string as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      debounce("nope", () => undefined)
    },
    /@asd14\/m\/debounce: expected 'options' to be 'Object', got 'String'/,
    "given [a string as options] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      debounce({ wait: "10" }, () => undefined)
    },
    /expected 'wait' to be 'Number', got 'String'/,
    "given [a string as wait] should [throw TypeError]"
  )

  t.throws(
    () => {
      debounce({ wait: -1 }, () => undefined)
    },
    /expected 'wait' to be 'TimerDelay', got '-1'/,
    "given [a negative wait] should [throw TypeError]"
  )

  // A timer stores its delay in 32 bits: a larger wait, or Infinity, would run
  // fn after 1 ms
  t.throws(
    () => debounce({ wait: Infinity }, () => undefined),
    /expected 'wait' to be 'TimerDelay', got 'Infinity'/,
    "given [an infinite wait] should [throw TypeError]"
  )

  t.throws(
    () => debounce({ wait: 2 ** 31 }, () => undefined),
    /expected 'wait' to be 'TimerDelay', got '2147483648'/,
    "given [a wait above 2,147,483,647 ms] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      debounce({ signal: { aborted: false } }, () => undefined)
    },
    /expected 'signal' to be 'AbortSignal', got 'Object'/,
    "given [a signal that is not an AbortSignal] should [throw TypeError]"
  )

  t.end()
})
