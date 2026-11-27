import test from "tape"

import { throttle } from "../throttle.js"

test("throttle - invalid", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      throttle(42)
    },
    /@asd14\/m\/throttle: expected 'fn' to be 'Function', got 'Number'/,
    "given [a number as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      throttle(null, () => undefined)
    },
    /expected 'options' to be 'Object', got 'Null'/,
    "given [null as options] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      throttle({ wait: "10" }, () => undefined)
    },
    /expected 'wait' to be 'Number', got 'String'/,
    "given [a string as wait] should [throw TypeError]"
  )

  t.throws(
    () => {
      throttle({ wait: -5 }, () => undefined)
    },
    /expected 'wait' to be 'TimerDelay', got '-5'/,
    "given [a negative wait] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      throttle({ hasLastCall: "yes" }, () => undefined)
    },
    /expected 'hasLastCall' to be 'Boolean', got 'String'/,
    "given [a string as hasLastCall] should [throw TypeError]"
  )

  // A timer stores its delay in 32 bits: a larger wait, or Infinity, would run
  // fn after 1 ms
  t.throws(
    () => throttle({ wait: Infinity }, () => undefined),
    /expected 'wait' to be 'TimerDelay', got 'Infinity'/,
    "given [an infinite wait] should [throw TypeError]"
  )

  t.throws(
    () => throttle({ wait: 2 ** 31 }, () => undefined),
    /expected 'wait' to be 'TimerDelay', got '2147483648'/,
    "given [a wait above 2,147,483,647 ms] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      throttle({ signal: { aborted: false } }, () => undefined)
    },
    /expected 'signal' to be 'AbortSignal', got 'Object'/,
    "given [a signal that is not an AbortSignal] should [throw TypeError]"
  )

  t.end()
})
