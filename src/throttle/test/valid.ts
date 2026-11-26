import { mock } from "node:test"
import test from "tape"

import { throttle } from "../throttle.js"

test("throttle - valid", t => {
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

  // Abort with a signal: the call waiting for the window end never runs, and
  // later calls do nothing
  {
    const calls: number[] = []
    const controller = new AbortController()
    const throttled = throttle(
      { wait: 50, hasLastCall: true, signal: controller.signal },
      (input: number) => calls.push(input)
    )

    throttled(1)
    throttled(2)
    controller.abort()
    mock.timers.tick(50)
    throttled(3)
    mock.timers.tick(50)
    t.deepEqual(
      calls,
      [1],
      "given [an abort inside the window] should [drop the last call and every later one]"
    )
  }

  {
    const calls: number[] = []
    const throttled = throttle(
      { signal: AbortSignal.abort() },
      (input: number) => calls.push(input)
    )

    throttled(1)
    t.deepEqual(
      calls,
      [],
      "given [a signal that is already aborted] should [never run fn]"
    )
  }

  mock.timers.reset()
  t.end()
})
