import { mock } from "node:test"
import test from "tape"

import { throttle } from "./throttle.js"

test("throttle - uncurried", t => {
  mock.timers.enable({ apis: ["setTimeout", "Date"] })

  {
    const calls: number[] = []
    const throttled = throttle((input: number) => calls.push(input))

    for (let i = 0; i < 100; i++) {
      throttled(i)
    }

    mock.timers.tick(100)
    t.deepEqual(
      calls,
      [0],
      "given [100 calls and the default options] should [run once, with the first call]"
    )

    throttled(100)
    t.deepEqual(
      calls,
      [0, 100],
      "given [a call after the window] should [run again]"
    )
  }

  {
    const calls: number[] = []
    const throttled = throttle(
      { wait: 50, hasLastCall: true },
      (input: number) => calls.push(input)
    )

    throttled(1)
    mock.timers.tick(100)
    t.deepEqual(
      calls,
      [1],
      "given [hasLastCall and one call] should [run fn once]"
    )
  }

  {
    const calls: number[] = []
    const throttled = throttle(
      { wait: 50, hasLastCall: true },
      (input: number) => calls.push(input)
    )

    for (let i = 0; i < 100; i++) {
      throttled(i)
    }

    t.deepEqual(
      calls,
      [0],
      "given [hasLastCall] should [run the first call at once]"
    )

    mock.timers.tick(49)
    t.deepEqual(
      calls,
      [0],
      "given [hasLastCall] should [wait for the window end]"
    )

    mock.timers.tick(1)
    t.deepEqual(
      calls,
      [0, 99],
      "given [100 calls and hasLastCall] should [run twice, with the first and the last params]"
    )

    mock.timers.tick(500)
    t.deepEqual(calls, [0, 99], "given [time passing] should [not run again]")
  }

  {
    const calls: number[] = []
    const throttled = throttle(
      { wait: 50, hasLastCall: true },
      (input: number) => calls.push(input)
    )

    throttled(1)
    mock.timers.tick(50)
    throttled(2)
    mock.timers.tick(500)
    t.deepEqual(
      calls,
      [1, 2],
      "given [hasLastCall and two calls one window apart] should [run each once]"
    )
  }

  {
    const calls: number[] = []
    const throttled = throttle({ wait: 50 }, (input: number) =>
      calls.push(input)
    )

    throttled(1)
    throttled(2)
    mock.timers.tick(500)
    t.deepEqual(
      calls,
      [1],
      "given [hasLastCall off] should [drop the calls of the window]"
    )
  }

  mock.timers.reset()
  t.end()
})

test("throttle - invalid input", t => {
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
    /expected 'wait' to be 'NonNegative', got '-5'/,
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

  t.end()
})
